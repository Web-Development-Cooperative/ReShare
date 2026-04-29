import clsx from 'clsx';

import { Tag, UniList } from '@shared/ui/others';
import { Paragraph14Reg, UIText14Medium } from '@shared/ui/paragraphs';
import { useAdCard } from '@shared/lib/otherUI.hooks';
import { LinkBase } from '@shared/ui/links';

import styles from './AdCard.module.css';

import type { IAdCard } from '@shared/model/otherUI.types';

const AdCard: IAdCard = ({
	img,
	title,
	author,
	description,
	tags,
	state = 'default',
}) => {
	const { imageSrc } = useAdCard(img);

	return (
		<LinkBase to="123" className={clsx(styles.card, styles[state])}>
			{/* <div>Компонент с лайком</div> */}
			<div className={styles.cardImageWrapper}>
				<img
					src={imageSrc}
					alt="Картинка объявления"
					className={styles.cardImage}
				/>
			</div>
			<div className={styles.cardInfo}>
				<h4>{title}</h4>
				<div className={styles.author}>
					<div className={styles.authorAvatar}>
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVRDk6EeQc7RhnJmF4SNjI91DDsfv5JJNRjQ&s"
							alt="Аватар автора"
						/>
					</div>
					<Paragraph14Reg className={styles.author}>
						{author}
					</Paragraph14Reg>
				</div>
				<UIText14Medium className={styles.description}>
					{description}
				</UIText14Medium>
				<UniList
					className={styles.tags}
					items={tags}
					renderItem={(tag) => (
						<Tag>
							<UIText14Medium>{tag.name}</UIText14Medium>
						</Tag>
					)}
				/>
			</div>
		</LinkBase>
	);
};

export { AdCard };
