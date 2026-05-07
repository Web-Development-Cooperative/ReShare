import { BackButton } from '@features/backButton';
import { ButtonBase } from '@shared/ui/buttons';
import {
	Heading24,
	Paragraph16Reg,
	UIText12Reg,
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '@shared/ui/paragraphs';
import { Heart, Leaf, Share } from '@shared/ui/icons';
import { Avatar, Rating, UniList } from '@shared/ui/others';
import { BgBorderDefault, BgIcone } from '@shared/ui/wrappers';
import { InputBase, TextareaBase } from '@shared/ui/inputs';
import { Dropdown } from '@shared/ui/others/dropdown/Dropdown';
import map from '@shared/assets/img/Map.jpg';

import {
	img,
	imgAlt,
	title,
	tags,
	description,
	transMethod,
	avatarUrl,
	fio,
	rating,
	year,
	location,
	date,
	views,
} from '../model/adPage.consts';
import { useAdPage } from '../lib/useAdPage.hooks';
import styles from './AdPage.module.css';

const AdPage = () => {
	const {
		ad: data,
		donor,
		allMetrics,
		settingsButtons,
		isEditMode,
		editForm,
		editErrors,
		handleEditFormChange,
		handleSaveEdit,
		handleCancelEdit,
		isSaving,
	} = useAdPage();

	const transferMethodOptions = [
		{ value: 'InPerson', label: 'Лично' },
		{ value: 'Delivery', label: 'Доставка' },
		{ value: 'Both', label: 'Лично или доставка' },
	];

	return (
		<div className={styles.ad}>
			<div className={styles.topButtons}>
				<BackButton />
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
							src={
								data?.photos?.find((f) => f.displayOrder === 0)
									?.url ?? img
							}
							alt={data?.title ?? imgAlt}
						/>
						<UniList
							className={styles['all-photos']}
							items={
								data?.photos?.filter(
									(f) => f.displayOrder !== 0,
								) || []
							}
							renderItem={(item) => (
								<img
									className={styles['mini-photo']}
									src={item.url ?? img}
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
							items={allMetrics}
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
					{isEditMode ? (
						<>
							<InputBase
								textLabel="Название"
								value={editForm.title}
								onChange={(e) =>
									handleEditFormChange(
										'title',
										e.target.value,
									)
								}
								stateStyle={
									editErrors.title ? 'error' : 'default'
								}
								helper={editErrors.title}
							/>
							<TextareaBase
								textLabel="Описание"
								value={editForm.description}
								onChange={(e) =>
									handleEditFormChange(
										'description',
										e.target.value,
									)
								}
								stateStyle={
									editErrors.description ? 'error' : 'default'
								}
								helper={editErrors.description}
							/>
							<div>
								<UIText14SB>Способ передачи</UIText14SB>
								<Dropdown
									options={transferMethodOptions}
									value={editForm.transferMethod}
									onChange={(val) =>
										handleEditFormChange(
											'transferMethod',
											val,
										)
									}
									placeholder="Выберите способ"
								/>
								{editErrors.transferMethod && (
									<UIText12Reg>
										{editErrors.transferMethod}
									</UIText12Reg>
								)}
							</div>
							<InputBase
								textLabel="Город"
								value={editForm.city}
								onChange={(e) =>
									handleEditFormChange('city', e.target.value)
								}
								stateStyle={
									editErrors.city ? 'error' : 'default'
								}
								helper={editErrors.city}
							/>
							<InputBase
								textLabel="Вес (г)"
								min={0}
								value={editForm.weightGrams}
								onChange={(e) => {
									const value = e.target.value;
									if (value.includes('.')) return;
									if (isNaN(+value)) return;
									handleEditFormChange('weightGrams', value);
								}}
								stateStyle={
									editErrors.weightGrams ? 'error' : 'default'
								}
								helper={editErrors.weightGrams}
							/>
						</>
					) : (
						<>
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
											<UIText14Medium>
												{item.tag}
											</UIText14Medium>
										</div>
										<UIText14Reg>•</UIText14Reg>
									</div>
								)}
							/>
							<div className={styles.description}>
								<h3>Описание</h3>
								<Paragraph16Reg>
									{data?.description ?? description}
								</Paragraph16Reg>
							</div>
							<div className={styles['trans-method']}>
								<h3>Способы передачи</h3>
								<Paragraph16Reg>
									{data?.transferMethod ?? transMethod}
								</Paragraph16Reg>
							</div>
						</>
					)}
					<BgBorderDefault
						className={styles['avatar-container']}
						colorType="white"
					>
						<Avatar
							src={data?.donor?.avatarUrl ?? avatarUrl}
							size="medium"
							shape="circle"
						/>
						<div className={styles['avatar-info']}>
							<UIText14Reg>
								{donor?.firstName && donor?.lastName
									? `${donor.firstName} ${donor.lastName}`
									: fio}
							</UIText14Reg>
							<div className={styles['avatar-tags']}>
								<Rating
									rating={donor?.rating ?? rating}
									size="small"
									right
								/>
								<UIText12Reg>
									{(donor?.ecoStats.itemsReceived || 0) +
										(donor?.ecoStats.itemsGifted || 0)}{' '}
									завершенных сделок
								</UIText12Reg>
								<UIText12Reg>
									На ShareSphere с{' '}
									{donor?.createdAt?.split('-')[0] ?? year}{' '}
									года
								</UIText12Reg>
							</div>
						</div>
					</BgBorderDefault>
					<div className={styles['settings-buttons']}>
						{isEditMode ? (
							<>
								<ButtonBase
									color="brand"
									onClick={handleSaveEdit}
									disabled={isSaving}
								>
									<UIText14SB>Сохранить изменения</UIText14SB>
								</ButtonBase>
								<ButtonBase
									color="shaded"
									onClick={handleCancelEdit}
									disabled={isSaving}
								>
									<UIText14SB>Отмена</UIText14SB>
								</ButtonBase>
							</>
						) : (
							settingsButtons.map((button) => (
								<ButtonBase
									key={button.id}
									color={button.color}
									onClick={button.onClick}
								>
									<UIText14SB>{button.text}</UIText14SB>
								</ButtonBase>
							))
						)}
					</div>
					<div className={styles.location}>
						<h3>Местоположение</h3>
						<Paragraph16Reg>
							{isEditMode
								? editForm.city
								: data?.location?.city || location}
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
