import { useState } from 'react';

import type { ChangeEvent, ComponentProps } from 'react';
import type { RenderStepTwoProps } from '../model/newPublicationPage.types';

const useRenderStepTwo = ({
	updateFormData,
	errors,
	setErrors,
}: ComponentProps<RenderStepTwoProps>) => {
	const [savedAddress, setSavedAddress] = useState(false);

	const toggleSavedAddress = () => {
		setSavedAddress((prev) => !prev);
	};
	const toggleContactType = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as 'messages' | 'calls_and_messages';
		updateFormData('contactType', value);

		if (value === 'messages') updateFormData('contact', 'messages-only');
		else updateFormData('contact', '');

		if (errors.contactType) {
			setErrors((prev) => ({ ...prev, contactType: undefined }));
		}
	};
	const updateAddress = (e: ChangeEvent<HTMLInputElement>) => {
		updateFormData('location', e.target.value);
		if (errors.location) {
			setErrors((prev) => ({ ...prev, location: undefined }));
		}
	};
	const updateContact = (e: ChangeEvent<HTMLInputElement>) => {
		updateFormData('contact', e.target.value);
		if (errors.contact) {
			setErrors((prev) => ({ ...prev, contact: undefined }));
		}
	};
	const toggleDeliveryType = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as 'personal_meeting' | 'delivery';
		updateFormData('deliveryType', value);
		if (errors.deliveryType) {
			setErrors((prev) => ({ ...prev, deliveryType: undefined }));
		}
	};
	return {
		savedAddress,
		toggleSavedAddress,
		toggleContactType,
		updateAddress,
		updateContact,
		toggleDeliveryType,
	};
};

export { useRenderStepTwo };
