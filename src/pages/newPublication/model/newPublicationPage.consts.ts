import type { ListingFormData, Step } from './newPublicationPage.types';

const STEP_VALIDATION: Record<Step, (keyof ListingFormData)[]> = {
	1: ['transferType', 'photos', 'title', 'categoryId', 'description'],
	2: ['location', 'transferMethod'],
	3: [],
	4: [],
};

export { STEP_VALIDATION };
