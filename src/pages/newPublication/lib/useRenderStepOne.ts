import { notification } from '@shared/lib/toast.helper';

import type { ChangeEvent, ComponentProps } from 'react';
import type { RenderStepOneProps } from '../model/newPublicationPage.types';

const useRenderStepOne = ({
	formData,
	updateFormData,
	errors,
	setErrors,
}: ComponentProps<RenderStepOneProps>) => {
	const updateType = (type: string) => {
		updateFormData('type', type);
		if (errors.type) {
			setErrors((prev) => ({ ...prev, type: undefined }));
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
	const updateCategory = (e: ChangeEvent<HTMLInputElement>) => {
		updateFormData('category', e.target.value);
		if (errors.category) {
			setErrors((prev) => ({ ...prev, category: undefined }));
		}
	};
	const updateCondition = (e: ChangeEvent<HTMLInputElement>) => {
		updateFormData('condition', e.target.value);
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
