import { AuthForm } from '@shared/ui/others';

import { useRegForm } from '../lib/useRegForm';

import type {
	LoginUserCommand,
	RegisterUserCommand,
} from '@shared/api/generated/identity-api';

const RegForm = () => {
	const { data, errors, onChange, onSubmit } = useRegForm();

	return (
		<AuthForm
			typeForm="reg"
			value={data as unknown as RegisterUserCommand & LoginUserCommand}
			onChange={onChange}
			onSubmit={onSubmit}
			errors={errors}
		/>
	);
};

export { RegForm };
