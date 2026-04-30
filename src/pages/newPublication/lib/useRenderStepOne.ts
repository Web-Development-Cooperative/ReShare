import { useGetCategoriesQuery } from '@entities/listings';
import { notification } from '@shared/lib/toast.helper';

import type { ChangeEvent, ComponentProps } from 'react';
import type { RenderStepOneProps } from '../model/newPublicationPage.types';

const useRenderStepOne = ({
	formData,
	updateFormData,
	errors,
	setErrors,
}: ComponentProps<RenderStepOneProps>) => {
	const { data } = useGetCategoriesQuery();
	const optionsCategory = data?.map((c) => ({
		value: c.id || '',
		label: c.name || '',
	}));
	const updateType = (type: string) => {
		updateFormData('transferType', type);
		if (errors.transferType) {
			setErrors((prev) => ({ ...prev, transferType: undefined }));
		}
	};
	const removePhoto = (index: number) => {
		const nextPhotos = (formData.photos || []).filter(
			(_, idx) => idx !== index,
		);
		updateFormData('photos', nextPhotos);
	};
	const addPhoto = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;
		if (!selectedFiles) return;

		const newFilesArray = Array.from(selectedFiles);

		const validFiles = newFilesArray.filter((file) =>
			file.type.startsWith('image/'),
		);

		if (validFiles.length === 0) {
			notification.info(
				'Можно загружать только изображения в формате JPG или PNG',
				{
					toastId: 'invalid-files',
				},
			);
			return;
		}

		const invalidCount = newFilesArray.length - validFiles.length;
		if (invalidCount > 0) {
			notification.info(
				`Отфильтровано ${invalidCount} недопустимых файла`,
				{
					toastId: 'filtered-files',
				},
			);
		}

		const remainingSlots = 4 - (formData.photos?.length || 0);
		const filesToAdd = validFiles.slice(0, remainingSlots);
		if (validFiles.length > remainingSlots) {
			notification.info(
				`Добавлено ${remainingSlots} фото, в связи с ограничением в 4 фото на объявление`,
				{
					toastId: 'overflow-photos',
				},
			);
		}

		updateFormData('photos', [...(formData.photos || []), ...filesToAdd]);
		e.target.value = '';
		if (errors.photos) {
			setErrors((prev) => ({ ...prev, photos: undefined }));
		}
	};
	const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
		updateFormData('title', e.target.value);
		if (errors.title) {
			setErrors((prev) => ({ ...prev, title: undefined }));
		}
	};
	const updateCategory = (val: string | number) => {
		updateFormData('categoryId', val.toString());
		if (errors.categoryId) {
			setErrors((prev) => ({ ...prev, categoryId: undefined }));
		}
	};
	const updateCondition = (val: string | number) => {
		updateFormData('condition', val.toString());
		if (errors.condition) {
			setErrors((prev) => ({ ...prev, condition: undefined }));
		}
	};
	const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		updateFormData('description', e.target.value);
		if (errors.description) {
			setErrors((prev) => ({ ...prev, description: undefined }));
		}
	};

	return {
		optionsCategory,
		updateType,
		removePhoto,
		addPhoto,
		updateTitle,
		updateCategory,
		updateCondition,
		updateDescription,
	};
};

export { useRenderStepOne };
