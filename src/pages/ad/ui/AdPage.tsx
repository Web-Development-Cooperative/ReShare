import { ButtonBase } from '@shared/ui/buttons';
import {
	Heading24,
	Paragraph16Reg,
	UIText12Reg,
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '@shared/ui/paragraphs';
import { ArrowLeft, Heart, Leaf, Share } from '@shared/ui/icons';
import { Avatar, Rating, UniList } from '@shared/ui/others';
import { BgBorderDefault, BgIcone } from '@shared/ui/wrappers';
import avatar from '@shared/assets/img/baseAvatarMale.png';
import map from '@shared/assets/img/Map.jpg';

import styles from './AdPage.module.css';

const AdPage = () => {
	const img = 'https://placehold.co/600x400?text=Main+Ad';
	const metrics = [
		{
			id: 1,
			title: 'кг',
			value: '200',
			description: 'Будет спасено от захоронения',
		},
		{
			id: 2,
			title: 'кг CO2',
			value: '200',
			description: 'Не попадет в атмосферу',
		},
		{
			id: 3,
			title: 'м3 воды',
			value: '46,3',
			description: 'будет сохранено',
		},
		{
			id: 4,
			title: 'МВт•ч энергии',
			value: '3,5',
			description: 'будет сэкономлено',
		},
	];
	const title = 'Продам велосипед';
	const tags = [
		{ id: 1, tag: 'Мебель' },
		{ id: 2, tag: 'Отличное состояние' },
		{ id: 3, tag: 'Дарение' },
	];
	const description =
		'Диван серого цвета, 3 года в эксплуатации. Чистый, без пятен и дефектов. Переезжаю в другой город. Могу отдать по будням после 19:00 по указанному адресу';
	const transMethod = 'Доставка, личная встреча';
	const avatarUrl = avatar;
	const fio = 'Аполлинария В.';
	const rating = 4.9;
	const compTrans = 15;
	const year = 2024;
	const location = 'Екатеринбург, Верх-Исетский район, ул. Татищева 94';
	const date = '5 часов назад';
	const views = 123;

	return (
		<div className={styles.ad}>
			<div className={styles.topButtons}>
				<ButtonBase color="shaded">
					<ArrowLeft />
					<UIText14SB>Вернуться назад</UIText14SB>
				</ButtonBase>
				<ButtonBase color="outline">
					<Share />
					<UIText14SB>Поделиться</UIText14SB>
				</ButtonBase>
				<ButtonBase color="outline">
					<Heart />
					<UIText14SB>В избранное</UIText14SB>
				</ButtonBase>
			</div>
			<div className={styles['main-info-wrapper']}>
				<div className={styles['first-data']}>
					<div className={styles['photos-wrapper']}>
						<img
							className={styles['main-photo']}
							src={img}
							alt={title}
						/>
						<UniList
							className={styles['all-photos']}
							items={[{ id: 1 }, { id: 2 }, { id: 3 }]}
							renderItem={(item) => (
								<img
									className={styles['mini-photo']}
									src={`https://placehold.co/600x400?text=Ad+${item.id}`}
								/>
							)}
						/>
					</div>
					<BgBorderDefault
						className={styles['eco-wrapper']}
						colorType="surface-1"
					>
						{/* TODO - Добавить зеленый background-color для BgBorderDefault и для BgIcone */}
						<div className={styles['eco-header']}>
							<BgIcone>
								<Leaf />
							</BgIcone>
							<div
								className={styles['eco-header-text-container']}
							>
								<h3>Экологический эффект</h3>
								<UIText14Reg>Примерный расчет</UIText14Reg>
							</div>
						</div>
						<UniList
							className={styles['goal-metrics-container']}
							items={metrics}
							renderItem={(item) => (
								<div className={styles['metrics-container']}>
									<Heading24>
										{item.value} {item.title}
									</Heading24>
									<UIText14Reg>
										{item.description}
									</UIText14Reg>
								</div>
							)}
						/>
					</BgBorderDefault>
				</div>
				<BgBorderDefault
					className={styles['second-data']}
					colorType="surface-1"
				>
					<h1>{title}</h1>
					<UniList
						className={styles['tags-list']}
						items={tags}
						renderItem={(item) => (
							<div className={styles['tag-container']}>
								<div className={styles['tag']}>
									<UIText14Medium>{item.tag}</UIText14Medium>
								</div>
								<UIText14Reg>•</UIText14Reg>
							</div>
						)}
					/>
					<div className={styles.description}>
						<h3>Описание</h3>
						<Paragraph16Reg>{description}</Paragraph16Reg>
					</div>
					<div className={styles['trans-method']}>
						<h3>Способы передачи</h3>
						<Paragraph16Reg>{transMethod}</Paragraph16Reg>
					</div>
					<BgBorderDefault
						className={styles['avatar-container']}
						colorType="white"
					>
						<Avatar src={avatarUrl} size="medium" shape="circle" />
						<div className={styles['avatar-info']}>
							<UIText14Reg>{fio}</UIText14Reg>
							<div className={styles['avatar-tags']}>
								<Rating rating={rating} size="small" right />
								<UIText12Reg>
									{compTrans} завершенных сделок
								</UIText12Reg>
								<UIText12Reg>
									На ShareSphere с {year} года
								</UIText12Reg>
							</div>
						</div>
					</BgBorderDefault>
					<div className={styles['settings-buttons']}>
						<ButtonBase color="brand">
							<UIText14SB> Написать сообщение</UIText14SB>
						</ButtonBase>
						<ButtonBase color="shaded">
							<UIText14SB>запросить бронь</UIText14SB>
						</ButtonBase>
						<ButtonBase color="brand">
							<UIText14SB> Снять с публикации</UIText14SB>
						</ButtonBase>
						<ButtonBase color="shaded">
							<UIText14SB>Редактировать объявление</UIText14SB>
						</ButtonBase>
						<ButtonBase color="shaded">
							<UIText14SB>Пожаловаться на объявление</UIText14SB>
						</ButtonBase>
					</div>
					<div className={styles.location}>
						<h3>Местоположение</h3>
						<Paragraph16Reg>{location}</Paragraph16Reg>
						<img src={map} />
					</div>
					<div className={styles['location-sec-data']}>
						<Paragraph16Reg>Опубликовано {date}</Paragraph16Reg>
						<UIText14Reg>•</UIText14Reg>
						<Paragraph16Reg>{views} просмотров</Paragraph16Reg>
					</div>
				</BgBorderDefault>
			</div>
		</div>
	);
};

export { AdPage };
