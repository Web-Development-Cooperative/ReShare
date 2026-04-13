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
		if (
			formData.photos?.length === 4 ||
			newFilesArray.length + (formData.photos?.length || 0) > 4
		) {
			notification.info('Максимум 4 фотографии');
			return;
		}

		updateFormData('photos', [
			...(formData.photos || []),
			...newFilesArray,
		]);
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
