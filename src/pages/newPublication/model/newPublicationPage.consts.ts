import type { ListingFormData, Step } from './newPublicationPage.types';

const STEP_VALIDATION: Record<Step, (keyof ListingFormData)[]> = {
	1: ['type', 'photos', 'title', 'category', 'description'],
	2: ['location', 'contactType', 'contact', 'deliveryType'],
	3: [],
	4: [],
};

export { STEP_VALIDATION };
