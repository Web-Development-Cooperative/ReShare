import type { ReactNode } from 'react';
import type { UniListProps } from '~~>shared/model/otherUI.types';

const UniList = <T extends {
    name: ReactNode; id: number | string 
}>({
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
