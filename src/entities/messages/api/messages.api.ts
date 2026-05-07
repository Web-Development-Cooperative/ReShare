import { baseApi, apiTags } from '@shared/api';

import type {
	ConversationDtoPagedList,
	ConversationCreatedDto,
	MessageDtoPagedList,
	MessageDto,
	CreateConversationDto,
	SendMessageDto,
	MessagingConversationsListParams,
	MessagingConversationsMessagesListParams,
	MessagingConversationsMessagesCreateParams,
	MessagingConversationsReadCreateParams,
} from '@shared/api/generated/messaging-api';

export const messagesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Список диалогов
		getConversations: builder.query<
			ConversationDtoPagedList,
			MessagingConversationsListParams
		>({
			query: (params) => ({
				url: '/messaging/conversations',
				method: 'GET',
				params,
			}),
			providesTags: [apiTags.Messages],
		}),

		// Создать диалог
		createConversation: builder.mutation<
			ConversationCreatedDto,
			CreateConversationDto
		>({
			query: (body) => ({
				url: '/messaging/conversations',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Messages],
		}),

		// Сообщения диалога
		getMessages: builder.query<
			MessageDtoPagedList,
			MessagingConversationsMessagesListParams
		>({
			query: ({ conversationId, ...params }) => ({
				url: `/messaging/conversations/${conversationId}/messages`,
				method: 'GET',
				params,
			}),
			providesTags: (_result, _error, { conversationId }) => [
				{ type: apiTags.Messages, id: conversationId },
			],
		}),

		// Отправить сообщение
		sendMessage: builder.mutation<
			MessageDto,
			MessagingConversationsMessagesCreateParams & SendMessageDto
		>({
			query: ({ conversationId, content }) => ({
				url: `/messaging/conversations/${conversationId}/messages`,
				method: 'POST',
				body: { content } satisfies SendMessageDto,
			}),
			invalidatesTags: (_result, _error, { conversationId }) => [
				{ type: apiTags.Messages, id: conversationId },
				apiTags.Messages,
			],
		}),

		// Отметить как прочитанное
		markAsRead: builder.mutation<
			void,
			MessagingConversationsReadCreateParams
		>({
			query: ({ conversationId }) => ({
				url: `/messaging/conversations/${conversationId}/read`,
				method: 'POST',
			}),
			invalidatesTags: [apiTags.Messages],
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useCreateConversationMutation,
	useGetMessagesQuery,
	useSendMessageMutation,
	useMarkAsReadMutation,
} = messagesApi;
