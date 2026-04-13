import { useState } from 'react';
import { useNavigate } from 'react-router';

import { notification } from '@shared/lib/toast.helper';

import { STEP_VALIDATION } from '../model/newPublicationPage.consts';

import type { ListingFormData, Step } from '../model/newPublicationPage.types';

const useNewPublicationPage = () => {
	const [currentStep, setCurrentStep] = useState<Step>(1);
	const [formData, setFormData] = useState<Partial<ListingFormData>>({});
	const [errors, setErrors] = useState<
		Partial<Record<keyof ListingFormData, string>>
	>({});
	const navigate = useNavigate();

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
			notification.error('Пожалуйста, заполните все обязательные поля');

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
	const handlePublish = () => {
		handleNext();
		alert('Объявление опубликовано!');
	};
	const handleCreateAnother = () => {
		setFormData({});
		setCurrentStep(1);
	};
	const updateFormData = (
		key: keyof ListingFormData,
		value: string | File[],
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
