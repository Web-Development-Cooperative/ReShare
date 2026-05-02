import { useParams } from 'react-router';

import { useGetListingQuery } from '@entities/listings';
import { getCookieValue } from '@shared/api';

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
	const { adId } = useParams<{ adId: string }>();

	const { data, isLoading } = useGetListingQuery(adId || '123');

	const isMyAd = data?.donor?.id === getMyId().myId;
	const settingsButtons: SettingsButtonsType = isMyAd
		? [
				{ id: 1, color: 'brand', text: 'Снять с публикации' },
				{ id: 2, color: 'shaded', text: 'Редактировать объявление' },
			]
		: [
				{ id: 1, color: 'brand', text: 'Написать сообщение' },
				{ id: 2, color: 'shaded', text: 'запросить бронь' },
				{ id: 3, color: 'shaded', text: 'Пожаловаться на объявление' },
			];

	return {
		ad: data,
		isLoading,
		settingsButtons,
	};
};

export { useAdPage };
