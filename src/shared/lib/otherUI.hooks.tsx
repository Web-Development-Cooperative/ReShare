import { useState } from 'react';

import { EyeOpen, EyeSlash } from '@shared/ui/icons';

import type { AuthFormProps } from '@shared/model/otherUI.types';

const useAuthForm = (typeForm: Parameters<AuthFormProps>[0]['typeForm']) => {
	const [inputPasswordState, setInputPasswordState] = useState(true);

	const onChangeInputState = () => {
		setInputPasswordState((cv) => !cv);
	};

	const title = typeForm === 'login' ? 'Войти в аккаунт' : 'Создайте аккаунт';
	const textButton = typeForm === 'login' ? 'Войти' : 'Зарегистрироваться';
	const inputPasswordType = inputPasswordState ? 'password' : 'text';

	const iconEye = inputPasswordState ? (
		<EyeSlash onClick={onChangeInputState} />
	) : (
		<EyeOpen onClick={onChangeInputState} />
	);
	return { title, textButton, inputPasswordType, iconEye };
};

export { useAuthForm };
