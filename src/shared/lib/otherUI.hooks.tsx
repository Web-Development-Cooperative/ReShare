import { useEffect, useMemo, useState } from 'react';

import { ROUTES } from '@shared/model/routes';
import { EyeOpen, EyeSlash } from '@shared/ui/icons';

import type { AuthFormProps } from '@shared/model/otherUI.types';

const useAuthForm = (typeForm: Parameters<AuthFormProps>[0]['typeForm']) => {
	const [inputPasswordState, setInputPasswordState] = useState(true);

	const onChangeInputState = () => {
		setInputPasswordState((cv) => !cv);
	};

	const title = typeForm === 'login' ? 'Войти в аккаунт' : 'Создайте аккаунт';
	const textButton = typeForm === 'login' ? 'Войти' : 'Зарегистрироваться';
	const textButtonSecondary =
		typeForm === 'login' ? 'Зарегистрироваться' : 'Войти';
	const link = typeForm === 'login' ? ROUTES.REG : ROUTES.LOGIN;
	const inputPasswordType = inputPasswordState ? 'password' : 'text';

	const iconEye = inputPasswordState ? (
		<EyeSlash onClick={onChangeInputState} />
	) : (
		<EyeOpen onClick={onChangeInputState} />
	);
	return {
		title,
		textButton,
		textButtonSecondary,
		inputPasswordType,
		link,
		iconEye,
	};
};

const useAdCard = (img: string | File) => {
	const imageSrc = useMemo(() => {
		if (typeof img === 'string') {
			return img;
		}

		return URL.createObjectURL(img);
	}, [img]);

	useEffect(() => {
		return () => {
			if (typeof img !== 'string' && img instanceof File) {
				URL.revokeObjectURL(imageSrc);
			}
		};
	}, [img, imageSrc]);

	return { imageSrc };
};

export { useAuthForm, useAdCard };
