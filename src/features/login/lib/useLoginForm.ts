import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '@entities/identity';
import { useValidation } from '@shared/lib/useValidation.hook';
import { notification } from '@shared/lib/toast.helper';

import type { ChangeEvent } from 'react';
import type { LoginUserCommand } from '@shared/api/generated/identity-api';

const useLoginForm = () => {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const [data, setData] = useState<LoginUserCommand>({
		login: '',
		password: '',
	});
	const { errors, validate, clearError, setErrors } =
		useValidation<LoginUserCommand>({
			login: { required: true },
			password: { required: true },
		});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData((cv) => ({ ...cv, [e.target.name]: e.target.value }));
		clearError(e.target.name as keyof LoginUserCommand);
	};
	const onSubmit = async () => {
		if (!validate(data)) {
			notification.error('Пожалуйста, заполните все поля', {
				toastId: 'fields-missing',
			});
			return;
		}

		try {
			await login(data).unwrap();

			setErrors({});
			navigate('/');
		} catch (err) {
			const errorMessage =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(err as any)?.data?.detail || 'Ошибка входа. Попробуйте снова';
			notification.error(errorMessage, {
				toastId: 'login-error',
			});
		}
	};

	useEffect(() => {
		if (isLoading) {
			const toastId = notification.loading('Вход в систему...', {
				autoClose: false,
			});
			return () => notification.dismiss(toastId);
		}
	}, [isLoading]);

	return {
		data,
		isLoading,
		errors,
		onChange,
		onSubmit,
	};
};

export { useLoginForm };
