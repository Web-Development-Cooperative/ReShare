// shared/api/signalR/messageHub.ts
import * as signalR from '@microsoft/signalr';

import { getCookieValue } from '@shared/api/baseQueryWithAuth';

export class MessageHub {
	private connection: signalR.HubConnection;
	private static instance: MessageHub;
	private readonly hubUrl: string;
	private readonly gatewayUrl: string;

	private constructor() {
		const gatewayUrl =
			// 'http://localhost:5005';
			import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8080/api';
		const baseUrl = gatewayUrl.replace(/\/api$/, '');
		this.gatewayUrl = gatewayUrl;
		this.hubUrl = `${baseUrl}/hubs/chat`;
		this.connection = this.buildConnection();
	}

	private buildConnection(): signalR.HubConnection {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(this.hubUrl, {
				// accessTokenFactory вызывается при каждом (пере)подключении,
				// поэтому всегда читает актуальный токен из cookie
				accessTokenFactory: () => getCookieValue('accessToken') || '',
				// Не ограничиваем транспорт — SignalR сам выберет лучший
				// (WebSockets → SSE → LongPolling).
				// Жёсткий WebSockets-only ломался на gateway, не поддерживающем WS-upgrade
			})
			.withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
			.configureLogging(signalR.LogLevel.Information)
			.build();

		// При попытке переподключения обновляем токен заранее,
		// чтобы accessTokenFactory вернул свежее значение
		connection.onreconnecting(() => {
			this.refreshToken().catch(() => {});
		});

		return connection;
	}

	// Обновление токена через тот же endpoint, что используется в baseQueryWithAuth
	private async refreshToken(): Promise<boolean> {
		try {
			const res = await fetch(`${this.gatewayUrl}/auth/refresh`, {
				method: 'POST',
				credentials: 'include',
			});
			return res.status === 204;
		} catch {
			return false;
		}
	}

	public static getInstance(): MessageHub {
		if (!MessageHub.instance) {
			MessageHub.instance = new MessageHub();
		}
		return MessageHub.instance;
	}

	// ===== Подключение =====
	public async start(): Promise<void> {
		if (this.connection.state !== signalR.HubConnectionState.Disconnected) {
			return;
		}
		try {
			await this.connection.start();
			console.log('SignalR Connected');
		} catch (err) {
			// SignalR при 401 на negotiate кидает HttpError со статусом,
			// при 401 на SSE/WS — AggregateErrors, где внутри может быть "401" или "Unauthorized".
			// Проверяем оба варианта.
			const errStr = String(err);
			const is401 =
				errStr.includes('401') ||
				errStr.includes('Unauthorized') ||
				(err instanceof Error &&
					'statusCode' in err &&
					(err as { statusCode: number }).statusCode === 401);
			if (is401) {
				const refreshed = await this.refreshToken();
				if (refreshed) {
					// Токен обновлён — пересоздаём соединение (accessTokenFactory прочитает новый токен из cookie)
					this.connection = this.buildConnection();
					setTimeout(() => this.start(), 500);
				} else {
					// Refresh не прошёл — перенаправляем на логин
					window.location.href = '/login';
				}
			} else {
				console.error('SignalR Connection Error:', err);
				setTimeout(() => this.start(), 5000);
			}
		}
	}

	// ===== Отключение =====
	public async stop(): Promise<void> {
		if (this.connection.state === signalR.HubConnectionState.Connected) {
			await this.connection.stop();
			console.log('SignalR Disconnected');
		}
	}

	// ===== Подписка на события =====

	// Новое сообщение получено
	// Сервер шлёт событие 'messagereceived' (camelCase)
	public onMessageReceived(callback: (message: MessageDto) => void): void {
		this.connection.on('messagereceived', callback);
	}

	// Сообщение отправлено (подтверждение)
	public onMessageSent(callback: (messageId: string) => void): void {
		this.connection.on('MessageSent', callback);
	}

	// Пользователь печатает
	public onUserTyping(
		callback: (conversationId: string, userId: string) => void,
	): void {
		this.connection.on('UserTyping', callback);
	}

	// Сообщение прочитано
	public onMessageRead(
		callback: (conversationId: string, messageId: string) => void,
	): void {
		this.connection.on('MessageRead', callback);
	}

	// Ошибка
	public onError(callback: (error: Error) => void): void {
		this.connection.onclose((error) => {
			if (error) {
				callback(error);
			}
		});
	}

	// ===== Отправка событий на сервер =====

	// Отправить сообщение
	public async sendMessage(
		conversationId: string,
		content: string,
	): Promise<void> {
		await this.connection.invoke('SendMessage', conversationId, content);
	}

	// Пользователь начал печатать
	public async sendTyping(conversationId: string): Promise<void> {
		await this.connection.invoke('SendTyping', conversationId);
	}

	// Прочитать сообщение
	public async markAsRead(
		conversationId: string,
		messageId: string,
	): Promise<void> {
		await this.connection.invoke('MarkAsRead', conversationId, messageId);
	}

	// ===== Управление группами (разговорами) =====

	// Вступить в группу разговора — сервер начнёт слать события этого чата
	public async joinConversation(conversationId: string): Promise<void> {
		if (this.connection.state === signalR.HubConnectionState.Connected) {
			await this.connection.invoke('JoinConversation', conversationId);
		}
	}

	// Покинуть группу разговора
	public async leaveConversation(conversationId: string): Promise<void> {
		if (this.connection.state === signalR.HubConnectionState.Connected) {
			await this.connection.invoke('LeaveConversation', conversationId);
		}
	}

	// ===== Управление подписками =====

	// Снять все обработчики события
	public off(eventName: string): void {
		this.connection.off(eventName);
	}

	// Снять конкретный обработчик (не трогает остальные подписки)
	public offHandler(
		eventName: string,
		callback: (...args: unknown[]) => void,
	): void {
		this.connection.off(eventName, callback);
	}
}

// Типы сообщений
export interface MessageDto {
	id: string;
	conversationId: string;
	senderId: string;
	content: string;
	createdAt: string;
	isRead: boolean;
}
