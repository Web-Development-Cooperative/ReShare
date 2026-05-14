import { Camera } from '@shared/ui/icons';
import { ButtonBase } from '@shared/ui/buttons';
import { Avatar } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { InputBase, TextareaBase } from '@shared/ui/inputs';

import { useEditProfilePopup } from '../../lib/useEditProfilePopup.hook';
import { AvatarCropOverlay } from './AvatarCropOverlay';
import styles from './EditProfilePopup.module.css';

import type { UserProfileDto } from '@shared/api/generated/users-api';

type Props = {
	data?: UserProfileDto;
	onSuccess?: () => void;
};

const EditProfilePopup = ({ data, onSuccess }: Props) => {
	const {
		form,
		errors,
		isLoading,
		avatarPreview,
		cropSrc,
		avatarInputRef,
		handleAvatarClick,
		handleAvatarChange,
		handleCropConfirm,
		handleCropCancel,
		handleChange,
		handleSave,
	} = useEditProfilePopup(data, onSuccess);

	if (cropSrc) {
		return (
			<AvatarCropOverlay
				imageSrc={cropSrc}
				onConfirm={handleCropConfirm}
				onCancel={handleCropCancel}
			/>
		);
	}

	return (
		<div className={styles['edit-profile']}>
			<div className={styles['avatar-wrapper']}>
				<Avatar shape="circle" size="huge" src={avatarPreview} />
				<button
					className={styles['avatar-edit-btn']}
					type="button"
					onClick={handleAvatarClick}
					disabled={isLoading}
				>
					<Camera />
				</button>
				<input
					ref={avatarInputRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={handleAvatarChange}
				/>
			</div>

			<InputBase
				textLabel="Имя"
				placeholder="Введите имя"
				value={form.firstName}
				onChange={(e) => handleChange('firstName', e.target.value)}
				stateStyle={errors.firstName ? 'error' : 'default'}
				helper={errors.firstName}
			/>
			<InputBase
				textLabel="Фамилия"
				placeholder="Введите фамилию"
				value={form.lastName}
				onChange={(e) => handleChange('lastName', e.target.value)}
				stateStyle={errors.lastName ? 'error' : 'default'}
				helper={errors.lastName}
			/>
			<TextareaBase
				textLabel="О себе"
				placeholder="Расскажите о себе"
				value={form.bio ?? ''}
				onChange={(e) => handleChange('bio', e.target.value)}
			/>
			<InputBase
				textLabel="Город"
				placeholder="Введите город"
				value={form.city ?? ''}
				onChange={(e) => handleChange('city', e.target.value)}
			/>

			<ButtonBase color="brand" onClick={handleSave} disabled={isLoading}>
				<UIText14SB>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</UIText14SB>
			</ButtonBase>
		</div>
	);
};

export { EditProfilePopup };
