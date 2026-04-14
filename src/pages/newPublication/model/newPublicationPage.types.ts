import type { FC, SetStateAction, Dispatch } from 'react';

type ListingFormData = {
	// Шаг 1
	type: string;
	photos: File[];
	title: string;
	category: string;
	condition: string;
	description: string;

	// Шаг 2
	location: string;
	contactType: 'messages' | 'calls_and_messages';
	contact: string;
	deliveryType: 'personal_meeting' | 'delivery';
};
type Step = 1 | 2 | 3 | 4;

type AllProps = {
	formData: Partial<ListingFormData>;
	updateFormData: (
		key: keyof ListingFormData,
		value: string | File[],
	) => void;
	errors: Partial<Record<keyof ListingFormData, string>>;
	setErrors: Dispatch<
		SetStateAction<Partial<Record<keyof ListingFormData, string>>>
	>;
};
type RenderStepOneProps = FC<AllProps>;
type RenderStepTwoProps = RenderStepOneProps;
type RenderStepThreeProps = FC<Pick<AllProps, 'formData'>>;

export type {
	ListingFormData,
	Step,
	RenderStepOneProps,
	RenderStepTwoProps,
	RenderStepThreeProps,
};
