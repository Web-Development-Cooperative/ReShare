import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useRegisterMutation } from '@entities/identity';
import { notification } from '@shared/lib/toast.helper';
import { UserRole } from '@shared/api/generated/identity-api';
import { useValidation } from '@shared/lib/useValidation.hook';

import type { ChangeEvent } from 'react';
import type { RegisterUserCommand } from '@shared/api/generated/identity-api';

const useRegForm = () => {
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();

	const [data, setData] = useState<RegisterUserCommand>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phone: '',
		role: UserRole.Donor,
	});
	const { errors, validate, clearError, setErrors } =
		useValidation<RegisterUserCommand>({
			email: { required: true },
			firstName: { required: true },
			lastName: { required: true },
			password: { required: true },
		});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData((cv) => ({ ...cv, [e.target.name]: e.target.value }));
		clearError(e.target.name as keyof RegisterUserCommand);
	};

	const onSubmit = async () => {
		if (!validate(data)) {
			notification.error('Пожалуйста, заполните все поля', {
				toastId: 'fields-missing',
			});
			return;
		}

		try {
			await register(data).unwrap();

			setErrors({});
			navigate('/');
		} catch (err) {
			const errorMessage =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(err as any)?.data?.detail ||
				'Ошибка регистрации. Попробуйте снова';
			notification.error(errorMessage, {
				toastId: 'registration-error',
			});
		}
	};

	useEffect(() => {
		if (isLoading) {
			const toastId = notification.loading('Регистрация в системе...', {
				autoClose: false,
			});
			return () => notification.dismiss(toastId);
		}
	}, [isLoading]);

	return { data, errors, onChange, onSubmit };
};

export { useRegForm };
