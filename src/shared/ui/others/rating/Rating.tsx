import { clsx } from 'clsx';

import { StarFull, StarHollow } from '~~>shared/ui/icons';
import { UniList } from '~~>shared/ui/others/uniList/UniList';
import { Heading24, UIText12SB, UIText14SB } from '~~>shared/ui/paragraphs';

import styles from './Rating.module.css';
import type { RatingProps } from '~~>shared/model/otherUI.types';

const Rating: RatingProps = ({
	rating,
	size = 'large',
	left = false,
	right = false,
	...props
}) => {
	const resText = (size: Parameters<RatingProps>[0]['size']) => {
		switch (size) {
			case 'large':
				return <Heading24>{rating}</Heading24>;
			case 'medium':
				return <UIText14SB>{rating}</UIText14SB>;
			case 'small':
				return <UIText12SB>{rating}</UIText12SB>;

			default:
				return null;
		}
	};
	return (
		<div className={clsx(styles.rating, styles[size])} {...props}>
			{left && resText(size)}
			<UniList
				className={styles.stars}
				items={Array.from({ length: 5 }, (_, i) => ({
					id: i + 1,
				}))}
				renderItem={(item) =>
					Math.round(rating) < item.id ? (
						<StarHollow size={size} />
					) : (
						<StarFull size={size} />
					)
				}
			/>
			{right && resText(size)}
		</div>
	);
};

export { Rating };
