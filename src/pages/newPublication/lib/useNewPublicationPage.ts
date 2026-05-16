import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import {
	useCreateListingMutation,
	useUpdateListingStatusMutation,
	useAddListingPhotoMutation,
} from '@entities/listings';
import { useUploadFileMutation } from '@entities/files';
import { ListingStatus } from '@shared/api/generated/listings-api';
import { notification } from '@shared/lib/toast.helper';

import { STEP_VALIDATION } from '../model/newPublicationPage.consts';

import type {
	AllProps,
	ListingFormData,
	Step,
} from '../model/newPublicationPage.types';
import type { CreateListingDto } from '@shared/api/generated/listings-api';

const useNewPublicationPage = () => {
	const [createListing, { isLoading: isPublishing }] =
		useCreateListingMutation();
	const [updateListingStatus] = useUpdateListingStatusMutation();
	const [addListingPhoto] = useAddListingPhotoMutation();
	const [uploadFile] = useUploadFileMutation();
	const [currentStep, setCurrentStep] = useState<Step>(1);
	const [formData, setFormData] = useState<Partial<ListingFormData>>({});
	const [errors, setErrors] = useState<
		Partial<Record<keyof ListingFormData, string>>
	>({});
	const navigate = useNavigate();

	useEffect(() => {
		if (isPublishing) {
			notification.loading('Публикация объявления...', {
				autoClose: false,
				toastId: 'publishing-listing',
			});

			return () => notification.dismiss('publishing-listing');
		}
	}, [isPublishing]);

	const validateStep = (
		step: Step,
		data: Partial<ListingFormData>,
	): (keyof ListingFormData)[] => {
		const requiredFields = STEP_VALIDATION[step];

		return requiredFields.filter((field) => {
			const value = data[field];

			if (typeof value === 'string' && value.trim() === '') return true;

			if (Array.isArray(value) && value.length === 0) return true;

			if (value == null) return true;

			return false;
		});
	};
	const handleNext = () => {
		const stepErrors = validateStep(currentStep, formData);

		if (stepErrors.length > 0) {
			const errorMessages: Partial<
				Record<keyof ListingFormData, string>
			> = {};
			stepErrors.forEach((field) => {
				errorMessages[field] = 'Это поле обязательно для заполнения';
			});
			setErrors(errorMessages);
			notification.error('Пожалуйста, заполните все обязательные поля', {
				toastId: 'fields-missing',
			});

			return;
		}

		setErrors({});
		if (currentStep < 4) {
			setCurrentStep((prev) => (prev + 1) as Step);
		}
	};
	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => (prev - 1) as Step);
		}
	};
	const handlePublish = async () => {
		if (
			!formData.title ||
			!formData.description ||
			!formData.categoryId ||
			!formData.condition ||
			!formData.transferType ||
			!formData.transferMethod
		) {
			notification.error(
				'Пожалуйста, заполните все обязательные поля',
				{},
			);
			return;
		}
		handleNext();

		const dto: CreateListingDto = {
			title: formData.title,
			description: formData.description,
			categoryId: formData.categoryId,
			condition: formData.condition,
			transferType: formData.transferType,
			transferMethod: formData.transferMethod,
			city: formData.location?.split(',')[0] || '',
			weightGrams: formData.weightGrams
				? +formData.weightGrams * 1000
				: 0,
			district: formData.district,
			latitude: formData.latitude ?? null,
			longitude: formData.longitude ?? null,
			tags: formData.tags?.filter(Boolean) || [],
		};

		try {
			const { id } = await createListing(dto).unwrap();

			if (formData.photos && formData.photos.length > 0) {
				const uploadPromises = formData.photos.map(
					async (file, index) => {
						const formDataFile = new FormData();
						formDataFile.append('file', file);
						const { url } = await uploadFile(formDataFile).unwrap();
						await addListingPhoto({
							id,
							photo: { url, displayOrder: index },
						}).unwrap();
					},
				);
				await Promise.all(uploadPromises);
			}

			await updateListingStatus({
				id,
				status: { status: ListingStatus.Active },
			}).unwrap();

			notification.success('Объявление опубликовано!');
		} catch {
			notification.error('Не удалось опубликовать объявление');
		}
	};
	const handleCreateAnother = () => {
		setFormData({});
		setCurrentStep(1);
	};
	const updateFormData = (
		key: keyof ListingFormData,
		value: Parameters<AllProps['updateFormData']>[1],
	) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	return {
		currentStep,
		formData,
		errors,
		updateFormData,
		handleNext,
		handleBack,
		handlePublish,
		handleCreateAnother,
		setErrors,
		navigate,
	};
};

export { useNewPublicationPage };
