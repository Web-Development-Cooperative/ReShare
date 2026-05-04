import img from '@shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '@shared/ui/buttons';
import { DownUp } from '@shared/ui/icons';
import { Avatar, Rating } from '@shared/ui/others';
import {
	Paragraph14Reg,
	Paragraph16Reg,
	UIText14Reg,
	UIText14SB,
} from '@shared/ui/paragraphs';

import { useRatingPopup } from '../../lib/useRatingPopup.hook';
import styles from './RatingPopup.module.css';

import type { RatingPopupProps } from '../../model/ratingPopup.types';

const RatingPopup: RatingPopupProps = ({ rating, countItems, reviewCount }) => {
	const { reviewsData } = useRatingPopup();
	console.log(reviewsData);
	// TODO: удалить моковые данные и юзать реальные из хука
	return (
		<div className={styles['rating-popup']}>
			<div className={styles.header}>
				<h3>Рейтинг продавца</h3>
				<Paragraph14Reg>
					Это среднее арифметическое оценок пользователей.
				</Paragraph14Reg>
			</div>
			<div className={styles.body}>
				<div className={styles.data}>
					<div className={styles['overall-rating-descr']}>
						<Rating rating={rating} size="large" right />
						<Paragraph16Reg className={styles['rating-descr']}>
							{reviewCount} отзыва за {countItems} завершенных
							сделок
						</Paragraph16Reg>
					</div>
					<ButtonBase color="filled">
						<UIText14SB>Сначала новые</UIText14SB>
						<DownUp />
					</ButtonBase>
				</div>
				<div className={styles.comments}>
					<div className={styles.comment}>
						<div className={styles.author}>
							<Avatar shape="square" size="large" src={img} />
							<div className={styles['name-time']}>
								<h3>Андрей Лампов</h3>
								<UIText14Reg className={styles.time}>
									{'Статус'} • {'Дата'}
								</UIText14Reg>
							</div>
						</div>
						<div className={styles['purchase-container']}>
							<Rating rating={5} size="small" />
							<Paragraph14Reg className={styles['purchase-name']}>
								Большой серый диван
							</Paragraph14Reg>
						</div>
						<UIText14Reg className={styles.message}>
							Честный порядочный донор, пошел на встречу по
							времени и месту
						</UIText14Reg>
					</div>
				</div>
			</div>
		</div>
	);
};

export { RatingPopup };
