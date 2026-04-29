import { AuthForm } from '@shared/ui/others';

import { useRegForm } from '../lib/useRegForm';

const RegForm = () => {
	const { data, onChange, onSubmit } = useRegForm();

	return (
		<AuthForm
			typeForm="reg"
			value={data}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export { RegForm };
