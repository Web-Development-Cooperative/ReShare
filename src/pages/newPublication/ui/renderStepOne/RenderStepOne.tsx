import clsx from 'clsx';

import { InputBase, TextareaBase } from '@shared/ui/inputs';
import { ButtonBase } from '@shared/ui/buttons';
import {
	Paragraph14Reg,
	UIText12Reg,
	UIText14Medium,
	UIText14SB,
} from '@shared/ui/paragraphs';
import { Camera, CrossPopup } from '@shared/ui/icons';

import { useRenderStepOne } from '../../lib/useRenderStepOne';
import { TYPE_OPTIONS } from '../../model/renderStepOne.consts';
import styles from './RenderStepOne.module.css';

import type { RenderStepOneProps } from '../../model/newPublicationPage.types';

const RenderStepOne: RenderStepOneProps = ({
	formData,
	updateFormData,
	errors,
	setErrors,
}) => {
	const {
		updateType,
		removePhoto,
		addPhoto,
		updateTitle,
		updateCategory,
		updateCondition,
		updateDescription,
	} = useRenderStepOne({
		formData,
		updateFormData,
		errors,
		setErrors,
	});

	return (
		<>
			<div className={styles.section}>
				<h3>Тип объявления</h3>
				<div className={styles.typeButtons}>
					{TYPE_OPTIONS.map((type) => (
						<ButtonBase
							key={type}
							className={styles.typeButton}
							color={formData.type === type ? 'brand' : 'outline'}
							stateStyle={errors.type ? 'error' : 'default'}
							onClick={() => updateType(type)}
						>
							<UIText14SB>{type}</UIText14SB>
						</ButtonBase>
					))}
				</div>
			</div>

			<div className={styles.section}>
				<h3>Фотографии</h3>
				<div className={styles.photosRow}>
					{formData.photos?.map((photo, index) => (
						<div key={index} className={styles.photoItem}>
							<img
								className={styles.photoPreview}
								src={URL.createObjectURL(photo)}
								alt={`Фото ${index + 1}`}
							/>
							<ButtonBase
								className={styles.photoRemove}
								onClick={() => removePhoto(index)}
								color="outline"
							>
								<CrossPopup />
							</ButtonBase>
						</div>
					))}

					<label
						className={clsx(styles.uploadCard, {
							[styles.errorPhotos]: errors.photos,
						})}
					>
						<input
							type="file"
							accept="image/*"
							multiple
							onChange={addPhoto}
							hidden
						/>
						<Camera />
						<div className={styles.uploadText}>
							<UIText14Medium>
								Добавьте фотографию вещи
							</UIText14Medium>
							<UIText12Reg className={styles.uploadHint}>
								JPG, HEIC, не более 5 МБ
							</UIText12Reg>
						</div>
					</label>
					<Paragraph14Reg>До 4х штук</Paragraph14Reg>
				</div>
			</div>

			<div className={styles.section}>
				<h3>Название *</h3>
				<InputBase
					placeholder="Что вы хотите отдать?"
					value={formData.title || ''}
					onChange={updateTitle}
					stateStyle={errors.title ? 'error' : 'default'}
					helper={errors.title}
				/>
			</div>

			<div className={styles.gridRow}>
				<div className={styles.section}>
					<h3>Категория *</h3>
					<InputBase
						placeholder="Выберите категорию"
						value={formData.category || ''}
						onChange={updateCategory}
						stateStyle={errors.category ? 'error' : 'default'}
						helper={errors.category}
					/>
				</div>
				<div className={styles.section}>
					<h3>Состояние вещи</h3>
					<InputBase
						placeholder="Выберите состояние вещи"
						value={formData.condition || ''}
						onChange={updateCondition}
						stateStyle={errors.condition ? 'error' : 'default'}
						helper={errors.condition}
					/>
				</div>
			</div>

			<div className={styles.section}>
				<h3>Описание *</h3>
				<TextareaBase
					placeholder="Опишите вашу вещь и важные детали"
					value={formData.description || ''}
					onChange={updateDescription}
					stateStyle={errors.description ? 'error' : 'default'}
					helper={errors.description}
				/>
			</div>
		</>
	);
};

export { RenderStepOne };
