import { useNavigate, useParams } from 'react-router';

import {
	useGetListingQuery,
	useUpdateListingStatusMutation,
} from '@entities/listings';
import { useCreateConversationMutation } from '@entities/messages';
import { useGetUserProfileQuery } from '@entities/users';
import { notification } from '@shared/lib/toast.helper';
import { ListingStatus } from '@shared/api/generated/listings-api';
import { getCookieValue } from '@shared/api';
import { ROUTES } from '@shared/model/routes';

import { metrics } from '../model/adPage.consts';

import type { SettingsButtonsType } from '../model/adPage.types';

const getMyId = () => {
	const token = getCookieValue('accessToken');
	const myId = { id: '123' };
	if (token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(
					(c) =>
						'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
				)
				.join(''),
		);

		myId.id =
			JSON.parse(jsonPayload)[
				'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
			];
	}
	return { myId: myId.id };
};

const useAdPage = () => {
	const [updateListingStatus] = useUpdateListingStatusMutation();
	const [createConversation] = useCreateConversationMutation();
	const { adId } = useParams<{ adId: string }>();
	const navigate = useNavigate();

	const { data, isLoading } = useGetListingQuery(adId || '123', {
		refetchOnMountOrArgChange: false,
	});
	const { data: donor } = useGetUserProfileQuery(data?.donor?.id || '123', {
		skip: !data?.donor?.id,
		refetchOnMountOrArgChange: false,
	});

	const isMyAd = data?.donor?.id === getMyId().myId;
	const settingsButtons: SettingsButtonsType = isMyAd
		? [
				{
					id: 1,
					color: 'brand',
					text: 'Снять с публикации',
					onClick: async () => {
						try {
							await updateListingStatus({
								id: adId || '123',
								status: { status: ListingStatus.Reserved },
							})
								.unwrap()
								.then(() => {
									updateListingStatus({
										id: adId || '123',
										status: {
											status: ListingStatus.Completed,
										},
									});
								});
							notification.success(
								'Объявление снято с публикации!',
							);
						} catch {
							notification.error(
								'Не удалось снять объявление с публикации',
							);
						}
					},
				},
				{
					id: 2,
					color: 'shaded',
					text: 'Редактировать объявление',
					onClick: () => {},
				},
			]
		: [
				{
					id: 1,
					color: 'brand',
					text: 'Написать сообщение',
					onClick: async () => {
						if (!data?.donor?.id || !adId) {
							notification.error(
								`Не удалось отправить сообщение. ID ${!data?.donor?.id ? 'автора' : 'объявления'} не найден.`,
							);
							return;
						}
						try {
							await createConversation({
								recipientId: data?.donor?.id,
								listingId: adId,
								initialMessage: '',
							})
								.unwrap()
								.then(({ conversationId }) => {
									if (!conversationId) {
										throw new Error(
											'Не удалось получить ID созданного чата',
										);
									}
									navigate(
										ROUTES.CHAT.replace(
											':chatId',
											conversationId,
										),
									);
								});
							notification.success('Чат создан!');
						} catch {
							notification.error('Не удалось создать чат!');
						}
					},
				},
				{
					id: 2,
					color: 'shaded',
					text: 'Запросить бронь',
					onClick: () => {},
				},
				{
					id: 3,
					color: 'shaded',
					text: 'Пожаловаться на объявление',
					onClick: () => {},
				},
			];

	const allMetrics = metrics.map((metric) => {
		const metricName = metric.id;
		if (data?.[metricName as keyof typeof data]) {
			return {
				...metric,
				value: String(data[metricName as keyof typeof data]),
			};
		}
		return metric;
	});

	return {
		ad: data,
		donor,
		isLoading,
		settingsButtons,
		allMetrics,
	};
};

export { useAdPage };
