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
import map from '@shared/assets/img/Map.jpg';

import {
	img,
	imgAlt,
	metrics,
	title,
	tags,
	description,
	transMethod,
	avatarUrl,
	fio,
	rating,
	compTrans,
	year,
	location,
	date,
	views,
} from '../model/adPage.consts';
import { useAdPage } from '../lib/useAdPage.hooks';
import styles from './AdPage.module.css';

const AdPage = () => {
	const { ad: data, settingsButtons } = useAdPage();

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
							// src={data?.photos?.[0]?.url || img}
							src={img}
							alt={data?.title || imgAlt}
						/>
						{/* TODO - Добавить остальные фото */}
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
					<h1>{data?.title || title}</h1>
					<UniList
						className={styles['tags-list']}
						items={
							data?.tags?.length
								? data?.tags?.map((tag) => ({
										id: tag,
										tag: tag,
									}))
								: tags
						}
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
						<Paragraph16Reg>
							{data?.description || description}
						</Paragraph16Reg>
					</div>
					<div className={styles['trans-method']}>
						<h3>Способы передачи</h3>
						<Paragraph16Reg>
							{data?.transferMethod || transMethod}
						</Paragraph16Reg>
					</div>
					<BgBorderDefault
						className={styles['avatar-container']}
						colorType="white"
					>
						<Avatar
							src={data?.donor?.avatarUrl || avatarUrl}
							size="medium"
							shape="circle"
						/>
						<div className={styles['avatar-info']}>
							<UIText14Reg>
								{data?.donor?.firstName && data?.donor?.lastName
									? `${data.donor.firstName} ${data.donor.lastName}`
									: fio}
							</UIText14Reg>
							<div className={styles['avatar-tags']}>
								<Rating
									rating={data?.donor?.rating || rating}
									size="small"
									right
								/>
								<UIText12Reg>
									{data?.donor?.completedTransactions ||
										compTrans}{' '}
									завершенных сделок
								</UIText12Reg>
								<UIText12Reg>
									На ShareSphere с {data?.donor?.year || year}{' '}
									года
								</UIText12Reg>
							</div>
						</div>
					</BgBorderDefault>
					<div className={styles['settings-buttons']}>
						{settingsButtons.map((button) => (
							<ButtonBase
								key={button.id}
								color={button.color}
								onClick={button.onClick}
							>
								<UIText14SB>{button.text}</UIText14SB>
							</ButtonBase>
						))}
					</div>
					<div className={styles.location}>
						<h3>Местоположение</h3>
						<Paragraph16Reg>
							{data?.location?.city || location}
						</Paragraph16Reg>
						<img src={map} />
					</div>
					<div className={styles['location-sec-data']}>
						<Paragraph16Reg>
							Опубликовано{' '}
							{data?.createdAt?.split('T')[0] || date}
						</Paragraph16Reg>
						<UIText14Reg>•</UIText14Reg>
						<Paragraph16Reg>
							{data?.viewCount || views} просмотров
						</Paragraph16Reg>
					</div>
				</BgBorderDefault>
			</div>
		</div>
	);
};

export { AdPage };
