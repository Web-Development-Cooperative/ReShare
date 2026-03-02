import { Suspense, type FC, type SuspenseProps } from 'react';

const Fallback = () => {
	return <div>Загрузка компонента...</div>;
};

const Limbo: FC<SuspenseProps> = ({ children, fallback, ...props }) => {
	return (
		<Suspense fallback={fallback || <Fallback />} {...props}>
			{children}
		</Suspense>
	);
};

export { Limbo };
