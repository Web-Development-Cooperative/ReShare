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
	contact: string;
	deliveryType: string;
};
type Step = 1 | 2 | 3 | 4;

type RenderStepOneProps = FC<{
	formData: Partial<ListingFormData>;
	updateFormData: (
		key: keyof ListingFormData,
		value: string | File[],
	) => void;
	errors: Partial<Record<keyof ListingFormData, string>>;
	setErrors: Dispatch<
		SetStateAction<Partial<Record<keyof ListingFormData, string>>>
	>;
}>;

export type { ListingFormData, Step, RenderStepOneProps };
