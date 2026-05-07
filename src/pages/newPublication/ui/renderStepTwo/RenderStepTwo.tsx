import { InputBase, Radio, Toggle } from '@shared/ui/inputs';
import { TransferMethod } from '@shared/api/generated/listings-api';

import { useRenderStepTwo } from '../../lib/useRenderStepTwo';
import styles from './RenderStepTwo.module.css';

import type { RenderStepTwoProps } from '../../model/newPublicationPage.types';

const RenderStepTwo: RenderStepTwoProps = ({
	formData,
	updateFormData,
	errors,
	setErrors,
}) => {
	const {
		savedAddress,
		toggleSavedAddress,
		// toggleContactType,
		updateAddress,
		// updateContact,
		toggleDeliveryType,
	} = useRenderStepTwo({
		formData,
		updateFormData,
		errors,
		setErrors,
	});

	return (
		<>
			<div className={styles.section}>
				<h3>Местоположение</h3>
				<InputBase
					placeholder="Город, район, улица"
					value={formData.location || ''}
					stateStyle={errors.location ? 'error' : 'default'}
					helper={errors.location}
					onChange={updateAddress}
				/>
				<Toggle
					label="Сохранить адрес для будущих объявлений"
					checked={savedAddress}
					onChange={toggleSavedAddress}
				/>
			</div>

			<div className={styles.section}>
				<h3>Контакты</h3>
				<Radio
					name="contactType"
					value="messages"
					// checked={formData.contactType === 'messages'}
					// onChange={toggleContactType}
					// error={!!errors.contactType}
					label="Только сообщения"
				/>
				<Radio
					name="contactType"
					// checked={formData.contactType === 'calls_and_messages'}
					value="calls_and_messages"
					// onChange={toggleContactType}
					// error={!!errors.contactType}
					label="Звонки и сообщения"
				/>
				{/* {formData.contactType == 'calls_and_messages' && (
					<InputBase
						type="tel"
						name="phone"
						textLabel="Контакт"
						value={formData.contact || ''}
						stateStyle={errors.contact ? 'error' : 'default'}
						helper={errors.contact}
						onChange={updateContact}
					/>
				)} */}
			</div>

			<div className={styles.section}>
				<h3>Способы передачи</h3>
				<Toggle
					label="Личная встреча"
					value={TransferMethod.InPerson}
					checked={formData.transferMethod == TransferMethod.InPerson}
					onChange={toggleDeliveryType}
					error={!!errors.transferMethod}
				/>
				<Toggle
					label="Доставка"
					value={TransferMethod.Delivery}
					checked={
						formData.transferMethod === TransferMethod.Delivery
					}
					onChange={toggleDeliveryType}
					error={!!errors.transferMethod}
				/>
				<Toggle
					label="Оба способа"
					value={TransferMethod.Both}
					checked={formData.transferMethod === TransferMethod.Both}
					onChange={toggleDeliveryType}
					error={!!errors.transferMethod}
				/>
			</div>
		</>
	);
};

export { RenderStepTwo };
