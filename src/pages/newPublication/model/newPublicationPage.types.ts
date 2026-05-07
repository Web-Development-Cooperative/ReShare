import type { FC, SetStateAction, Dispatch } from 'react';
import type {
	TransferType,
	ItemCondition,
	TransferMethod,
} from '@shared/api/generated/listings-api';

type ListingFormData = {
	transferType: TransferType;
	photos: File[];
	title: string;
	categoryId: string;
	condition: ItemCondition;
	description: string;
	tags: string[];
	weightGrams: string;

	location: string;
	district: string;
	latitude: number | null;
	longitude: number | null;
	transferMethod: TransferMethod;
};
type Step = 1 | 2 | 3 | 4;

type AllProps = {
	formData: Partial<ListingFormData>;
	updateFormData: (
		key: keyof ListingFormData,
		value: string | File[] | string[] | number | null,
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
	AllProps,
};
