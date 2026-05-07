import { AuthForm } from '@shared/ui/others';

import { useLoginForm } from '../lib/useLoginForm';

import type {
	LoginUserCommand,
	RegisterUserCommand,
} from '@shared/api/generated/identity-api';

const LoginForm = () => {
	const { data, onChange, onSubmit, isLoading, errors } = useLoginForm();

	return (
		<AuthForm
			typeForm="login"
			value={data as unknown as RegisterUserCommand & LoginUserCommand}
			onChange={onChange}
			onSubmit={onSubmit}
			isLoading={isLoading}
			errors={errors}
		/>
	);
};

export { LoginForm };
