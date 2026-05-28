import { useState } from 'react';

import type { ChangeEvent, ComponentProps } from 'react';
import type { TransferMethod } from '@shared/api/generated/listings-api';
import type { RenderStepTwoProps } from '../model/newPublicationPage.types';
import type { Address } from '@shared/model/otherUI.types';

const useRenderStepTwo = ({
	updateFormData,
	errors,
	setErrors,
}: ComponentProps<RenderStepTwoProps>) => {
	const [savedAddress, setSavedAddress] = useState(false);

	const toggleSavedAddress = () => {
		setSavedAddress((prev) => !prev);
	};

	// const updateAddress = (e: ChangeEvent<HTMLInputElement>) => {
	// 	updateFormData('location', e.target.value);
	// 	if (errors.location) {
	// 		setErrors((prev) => ({ ...prev, location: undefined }));
	// 	}
	// };
	const updateAddress = (address: Address | null) => {
		const location = address
			? `${address.location}${address.route ? `, ${address.route}` : ''}`
			: '';

			console.log(address);
		updateFormData('location', location);
		if (errors.location) {
			setErrors((prev) => ({ ...prev, location: undefined }));
		}
	};
	const updateCoords = (coords: Array<number> | null) => {
		if (coords) {
			updateFormData('latitude', coords[0]);
			updateFormData('longitude', coords[1]);
		} else {
			updateFormData('latitude', '');
			updateFormData('longitude', '');
		}
		if (errors.location) {
			setErrors((prev) => ({ ...prev, location: undefined }));
		}
	};

	const toggleDeliveryType = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value as TransferMethod;
		updateFormData('transferMethod', value);
		if (errors.transferMethod) {
			setErrors((prev) => ({ ...prev, transferMethod: undefined }));
		}
	};
	return {
		savedAddress,
		toggleSavedAddress,
		updateAddress,
		updateCoords,
		toggleDeliveryType,
	};
};

export { useRenderStepTwo };
