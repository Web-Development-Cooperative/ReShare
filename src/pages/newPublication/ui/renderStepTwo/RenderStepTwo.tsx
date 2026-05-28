import { InputBase, Radio, Toggle } from '@shared/ui/inputs';
import { GeoMap } from '@shared/ui/others';
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
		updateAddress,
		updateCoords,
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
					// onChange={updateAddress}
				/>
				<Toggle
					label="Сохранить адрес для будущих объявлений"
					checked={savedAddress}
					onChange={toggleSavedAddress}
				/>
				<GeoMap
					initialCoordinates={
						formData.longitude && formData.latitude
							? [formData.latitude, formData.longitude]
							: null
					}
					initialAddress={{
						location: formData.location?.split(',')[0].trim() ?? '',
						route: formData.location?.split(',')[1]?.trim() ?? '',
					}}
					setInitialCoordinates={updateCoords}
					setInitialAddress={updateAddress}
				/>
			</div>

			<div className={styles.section}>
				<h3>Контакты</h3>
				<Radio
					name="contactType"
					value="messages"
					label="Только сообщения"
				/>
				<Radio
					name="contactType"
					value="calls_and_messages"
					label="Звонки и сообщения"
				/>
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
