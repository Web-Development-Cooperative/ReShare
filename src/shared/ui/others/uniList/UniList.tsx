import type { UniListProps } from '@shared/model/otherUI.types';
import type { ReactNode } from 'react';

const UniList = <T extends { id: number | string }>({
	items,
	renderItem,
	...rest
}: UniListProps<T>): ReactNode => {
	return (
		<ul {...rest}>
			{items.map((item, index) => (
				<li key={item.id}>{renderItem(item, index)}</li>
			))}
		</ul>
	);
};
export { UniList };
