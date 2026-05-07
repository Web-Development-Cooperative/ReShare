import { InputBase, InputDropZone, TextareaBase } from '@shared/ui/inputs';
import { ButtonBase } from '@shared/ui/buttons';
import { Paragraph14Reg, UIText14SB } from '@shared/ui/paragraphs';
import { CrossPopup } from '@shared/ui/icons';
import { Dropdown } from '@shared/ui/others/dropdown/Dropdown';

import { useRenderStepOne } from '../../lib/useRenderStepOne';
import {
	CONDITION_OPTIONS,
	TYPE_OPTIONS,
	TYPE_OPTIONS_EN,
} from '../../model/renderStepOne.consts';
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
		updateWeight,
		optionsCategory,
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
							color={
								formData.transferType === TYPE_OPTIONS_EN[type]
									? 'brand'
									: 'outline'
							}
							disabled={
								formData.transferType === TYPE_OPTIONS_EN[type]
							}
							stateStyle={
								errors.transferType ? 'error' : 'default'
							}
							onClick={() => updateType(TYPE_OPTIONS_EN[type])}
						>
							<UIText14SB>{type}</UIText14SB>
						</ButtonBase>
					))}
				</div>
			</div>

			<div className={styles.section}>
				<h3>Фотографии</h3>
				<div className={styles.photosRow}>
					<InputDropZone errors={errors.photos} addPhoto={addPhoto} />
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

			<div className={styles.section}>
				<h3>Вес(кг) *</h3>
				<InputBase
					placeholder="Введите вес вещи"
					value={formData.weightGrams || ''}
					onChange={updateWeight}
					stateStyle={errors.weightGrams ? 'error' : 'default'}
					helper={errors.weightGrams}
				/>
			</div>

			<div className={styles.gridRow}>
				<div className={styles.section}>
					<h3>Категория *</h3>
					{/* <InputBase
						placeholder="Выберите категорию"
						value={formData.categoryId || ''}
						onChange={updateCategory}
						stateStyle={errors.category ? 'error' : 'default'}
						helper={errors.category}
					/> */}
					{/* TODO - добавить хелперы в дропдаун */}
					<Dropdown
						value={formData.categoryId}
						options={optionsCategory || []}
						onChange={updateCategory}
						placeholder="Выберите категорию"
					/>
				</div>
				<div className={styles.section}>
					<h3>Состояние вещи</h3>
					{/* <InputBase
						placeholder="Выберите состояние вещи"
						value={formData.condition || ''}
						onChange={updateCondition}
						stateStyle={errors.condition ? 'error' : 'default'}
						helper={errors.condition}
						/> */}
					{/* TODO - добавить хелперы в дропдаун */}
					<Dropdown
						value={formData.condition}
						options={CONDITION_OPTIONS || []}
						onChange={updateCondition}
						placeholder="Выберите состояние вещи"
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
