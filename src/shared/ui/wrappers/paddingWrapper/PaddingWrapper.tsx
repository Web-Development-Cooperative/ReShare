import type { PaddingWrapperProps } from '@shared/model/wrapper.types';

const PaddingWrapper: PaddingWrapperProps = ({ x, y, children, ...props }) => {
	return (
		<div style={{ padding: `${y}px ${x}px` }} {...props}>
			{children}
		</div>
	);
};

export { PaddingWrapper };
