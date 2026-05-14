import clsx from 'clsx';

import { Avatar, Tag, UniList } from '@shared/ui/others';
import { Paragraph14Reg, UIText14Medium } from '@shared/ui/paragraphs';
import { LinkBase } from '@shared/ui/links';
import { useAdCard } from '@shared/lib/otherUI.hooks';
import { ROUTES } from '@shared/model/routes';

import styles from './AdCard.module.css';

import type { IAdCard } from '@shared/model/otherUI.types';

const AdCard: IAdCard = ({
	id = 123,
	img,
	title,
	author,
	authorAvatarUrl,
	description,
	tags,
	state = 'default',
}) => {
	const { imageSrc } = useAdCard(img);

	return (
		<LinkBase
			to={ROUTES.AD.replace(':adId', id.toString())}
			className={clsx(styles.card, styles[state])}
		>
			{/* <div>Компонент с лайком</div> */}
			<div className={styles.cardImageWrapper}>
				<img
					src={imageSrc}
					alt="Картинка объявления"
					className={styles.cardImage}
				/>
			</div>
			<div className={styles.cardInfo}>
				<h4 className={styles['card-name']}>{title}</h4>
				<div className={styles.author}>
					<Avatar
						src={authorAvatarUrl ?? undefined}
						size="medium"
						shape="circle"
					/>
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
