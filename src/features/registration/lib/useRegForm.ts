import { useState, type ChangeEvent } from 'react';

const useRegForm = () => {
	const [data, setData] = useState({ email: '', password: '' });

	const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
		setData((cv) => ({ ...cv, [e.target.name]: e.target.value }));
	};

	const onSubmit = () => {
		console.log(data);
	};

	return { data, onChange, onSubmit };
};

export { useRegForm };
