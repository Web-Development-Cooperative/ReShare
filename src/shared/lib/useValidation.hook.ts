import { useState, useCallback } from 'react';

import { validateFields } from './validateFields';

import type { ValidationSchema } from './validateFields';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useValidation = <T extends Record<string, any>>(
	initialSchema: ValidationSchema<T>,
) => {
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

	const validate = useCallback(
		(data: Partial<T>, schema: ValidationSchema<T> = initialSchema) => {
			const validationErrors = validateFields(data, schema);
			if (validationErrors) {
				setErrors(validationErrors);
				return false;
			}

			setErrors({});
			return true;
		},
		[initialSchema],
	);

	const clearError = useCallback((field: keyof T) => {
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[field];
			return newErrors;
		});
	}, []);

	return {
		errors,
		validate,
		clearError,
		setErrors,
	};
};
