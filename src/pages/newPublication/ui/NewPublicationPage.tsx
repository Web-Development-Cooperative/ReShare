import { Link } from 'react-router';

import { clsx } from 'clsx';

import { ButtonBase } from '@shared/ui/buttons';
import { ArrowRight, Check, CrossPopup } from '@shared/ui/icons';
import { Paragraph16Reg, UIText14SB } from '@shared/ui/paragraphs';
import { StepsHorizontal } from '@shared/ui/others';
import { ROUTES } from '@shared/model/routes';

import { useNewPublicationPage } from '../lib/useNewPublicationPage';
import { RenderStepOne } from './renderStepOne/RenderStepOne';
import { RenderStepTwo } from './renderStepTwo/RenderStepTwo';
import { RenderStepThree } from './renderStepThree/RenderStepThree';
import { RenderStepFour } from './renderStepFour/RenderStepFour';
import styles from './NewPublicationPage.module.css';

const NewPublicationPage = () => {
	const {
		currentStep,
		formData,
		errors,
		updateFormData,
		handleNext,
		handleBack,
		handlePublish,
		handleCreateAnother,
		setErrors,
		navigate,
	} = useNewPublicationPage();

	console.log(formData);

	return (
		<div className={styles['new-publication-page']}>
			<div className={styles.header}>
				<ButtonBase onClick={() => navigate(-1)}>
					<CrossPopup />
				</ButtonBase>
				<div className={styles['header-title']}>
					<h2>Новое объявление</h2>
					<Paragraph16Reg>Шаг {currentStep} из 3</Paragraph16Reg>
				</div>
			</div>

			<StepsHorizontal currentStep={currentStep} steps={3} />

			{currentStep === 1 && (
				<RenderStepOne
					formData={formData}
					updateFormData={updateFormData}
					errors={errors}
					setErrors={setErrors}
				/>
			)}
			{currentStep === 2 && (
				<RenderStepTwo
					formData={formData}
					updateFormData={updateFormData}
					errors={errors}
					setErrors={setErrors}
				/>
			)}
			{currentStep === 3 && <RenderStepThree formData={formData} />}
			{currentStep === 4 && <RenderStepFour />}
			{/* {currentStep === 2 && renderStep2()} */}
			{/* {currentStep === 3 && renderStep3()} */}

			<div
				className={clsx(styles['buttons'], {
					[styles.last]: currentStep === 4,
				})}
			>
				{currentStep > 1 && currentStep <= 3 && (
					<ButtonBase onClick={handleBack} color="outline" withBorder>
						<UIText14SB>Назад</UIText14SB>
					</ButtonBase>
				)}
				{currentStep < 3 && (
					<ButtonBase onClick={handleNext} color="brand">
						<UIText14SB>Далее</UIText14SB>
						<ArrowRight />
					</ButtonBase>
				)}
				{currentStep === 3 && (
					<ButtonBase onClick={handlePublish} color="brand">
						<UIText14SB>Опубликовать объявление</UIText14SB>
						<Check />
					</ButtonBase>
				)}
				{currentStep === 4 && (
					<ButtonBase onClick={handleCreateAnother} color="brand">
						<UIText14SB>Создать еще</UIText14SB>
					</ButtonBase>
				)}
				{currentStep === 4 && (
					<Link to={ROUTES.ADS}>
						<ButtonBase color="outline">
							<UIText14SB>К объявлениям</UIText14SB>
						</ButtonBase>
					</Link>
				)}
			</div>
		</div>
	);
};

export { NewPublicationPage };
