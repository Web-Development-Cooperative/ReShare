import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

import { useValidation } from '@shared/lib/useValidation.hook';
import {
	useGetListingQuery,
	useUpdateListingStatusMutation,
	useUpdateListingMutation,
} from '@entities/listings';
import { useCreateConversationMutation } from '@entities/messages';
import { useGetUserProfileQuery } from '@entities/users';
import { notification } from '@shared/lib/toast.helper';
import {
	ItemCondition,
	ListingStatus,
	TransferMethod,
	TransferType,
} from '@shared/api/generated/listings-api';
import { getCookieValue } from '@shared/api';
import { ROUTES } from '@shared/model/routes';

import { metrics } from '../model/adPage.consts';

import type { SettingsButtonsType, EditFormData } from '../model/adPage.types';

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
	const [updateListing, { isLoading: isSaving }] = useUpdateListingMutation();
	const [createConversation] = useCreateConversationMutation();
	const { adId } = useParams<{ adId: string }>();
	const navigate = useNavigate();

	const [isEditMode, setIsEditMode] = useState(false);
	const [editForm, setEditForm] = useState<EditFormData>({
		title: '',
		description: '',
		transferMethod: '',
		city: '',
		weightGrams: '',
	});
	const {
		errors: editErrors,
		validate: validateEdit,
		clearError,
	} = useValidation<EditFormData>({
		title: { required: true, message: 'Обязательное поле' },
		description: {},
		transferMethod: { required: true, message: 'Обязательное поле' },
		city: { required: true, message: 'Обязательное поле' },
		weightGrams: { required: true, message: 'Обязательное поле' },
	});

	const { data, isLoading } = useGetListingQuery(adId || '123', {
		refetchOnMountOrArgChange: false,
	});
	const { data: donor } = useGetUserProfileQuery(data?.donor?.id || '123', {
		skip: !data?.donor?.id,
		refetchOnMountOrArgChange: false,
	});

	const isMyAd = data?.donor?.id === getMyId().myId;

	const handleStartEdit = () => {
		setEditForm({
			title: data?.title ?? '',
			description: data?.description ?? '',
			transferMethod: data?.transferMethod ?? '',
			city: data?.location?.city ?? '',
			weightGrams:
				data?.weightGrams != null ? String(data.weightGrams) : '',
		});
		setIsEditMode(true);
	};

	const handleCancelEdit = () => {
		setIsEditMode(false);
	};

	const handleEditFormChange = (field: keyof EditFormData, value: string) => {
		setEditForm((prev) => ({ ...prev, [field]: value }));
		clearError(field);
	};

	const handleSaveEdit = async () => {
		const isValid = validateEdit(editForm);
		if (!isValid) {
			notification.error('Пожалуйста, заполните все обязательные поля', {
				toastId: 'edit-validation',
			});
			return;
		}

		if (!data || !adId) return;

		try {
			await updateListing({
				id: adId,
				data: {
					title: editForm.title,
					description: editForm.description,
					transferMethod: editForm.transferMethod as TransferMethod,
					city: editForm.city,
					categoryId: data.category?.id ?? '',
					condition: data.condition as ItemCondition,
					transferType: data.transferType as TransferType,
					weightGrams: editForm.weightGrams
						? +editForm.weightGrams
						: 0,
					district: data.location.district ?? null,
					tags: data.tags ?? null,
				},
			}).unwrap();
			notification.success('Изменения сохранены!');
			setIsEditMode(false);
		} catch {
			notification.error('Не удалось сохранить изменения');
		}
	};

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
					onClick: handleStartEdit,
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

	const photos =
		data?.photos && data.photos.length > 0
			? [...data.photos]
					.sort(
						(a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
					)
					.map((p, i) => ({ ...p, id: String(i) }))
			: [];

	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () =>
		setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
	const handleNext = () => setCurrentIndex((i) => (i + 1) % photos.length);

	const handleShare = async () => {
		const url = window.location.href;
		await navigator.clipboard.writeText(url);
		notification.success('Ссылка скопирована в буфер обмена');
	};

	return {
		ad: data,
		photos,
		handlePrev,
		handleNext,
		handleShare,
		currentIndex,
		setCurrentIndex,
		donor,
		isLoading,
		isSaving,
		settingsButtons,
		allMetrics,
		isEditMode,
		editForm,
		editErrors,
		handleEditFormChange,
		handleSaveEdit,
		handleCancelEdit,
	};
};

export { useAdPage };
