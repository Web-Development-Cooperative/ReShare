import { AuthForm } from '@shared/ui/others';

import { useLoginForm } from '../lib/useLoginForm';

const LoginForm = () => {
	const { data, onChange, onSubmit } = useLoginForm();

	return (
		<AuthForm
			typeForm="login"
			value={data}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export { LoginForm };
