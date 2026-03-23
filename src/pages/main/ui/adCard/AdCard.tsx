import { Tag, UniList } from '@shared/ui/others';
import { Paragraph14Reg, UIText14Medium } from '@shared/ui/paragraphs';

import styles from './AdCard.module.css';

const AdCard = ({ img, title, author, description, tags }) => {
	return (
		<div className={styles.card}>
			{/* <div>Компонент с лайком</div> */}
			<div className={styles.cardImageWrapper}>
				<img
					src={img}
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
		</div>
	);
};

export default AdCard;
