import { useRef, useState } from 'react';

import {
	useUpdateMyProfileMutation,
	useUpdateMyAvatarMutation,
} from '@entities/users';
import { useUploadFileMutation } from '@entities/files';
import { notification } from '@shared/lib/toast.helper';

import { cropImage } from './cropImage';

import type {
	UserProfileDto,
	UpdateProfileRequest,
} from '@shared/api/generated/users-api';
import type { Area } from 'react-easy-crop';

const useEditProfilePopup = (
	data: UserProfileDto | undefined,
	onSuccess?: () => void,
) => {
	const [form, setForm] = useState<UpdateProfileRequest>({
		firstName: data?.firstName ?? '',
		lastName: data?.lastName ?? '',
		bio: data?.bio ?? '',
		city: data?.city ?? '',
	});

	const [errors, setErrors] = useState<
		Partial<Record<keyof UpdateProfileRequest, string>>
	>({});

	const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
		data?.avatarUrl ?? undefined,
	);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [cropSrc, setCropSrc] = useState<string | null>(null);
	const avatarInputRef = useRef<HTMLInputElement>(null);

	const [updateProfile, { isLoading: isProfileLoading }] =
		useUpdateMyProfileMutation();
	const [uploadFile, { isLoading: isUploadLoading }] =
		useUploadFileMutation();
	const [updateAvatar, { isLoading: isAvatarLoading }] =
		useUpdateMyAvatarMutation();

	const isLoading = isProfileLoading || isUploadLoading || isAvatarLoading;

	const handleAvatarClick = () => avatarInputRef.current?.click();

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		// Reset input value so the same file can be re-selected
		e.target.value = '';
		const objectUrl = URL.createObjectURL(file);
		setCropSrc(objectUrl);
	};

	const handleCropConfirm = async (croppedAreaPixels: Area) => {
		if (!cropSrc) return;
		try {
			const croppedFile = await cropImage(cropSrc, croppedAreaPixels);
			setAvatarFile(croppedFile);
			setAvatarPreview(URL.createObjectURL(croppedFile));
		} catch {
			notification.error('Не удалось обрезать фото');
		} finally {
			URL.revokeObjectURL(cropSrc);
			setCropSrc(null);
		}
	};

	const handleCropCancel = () => {
		if (cropSrc) URL.revokeObjectURL(cropSrc);
		setCropSrc(null);
	};

	const handleChange = (field: keyof UpdateProfileRequest, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const validate = (): boolean => {
		const next: typeof errors = {};
		if (!form.firstName.trim()) next.firstName = 'Введите имя';
		if (!form.lastName.trim()) next.lastName = 'Введите фамилию';
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSave = async () => {
		if (!validate()) return;
		try {
			if (avatarFile) {
				const formData = new FormData();
				formData.append('file', avatarFile);
				const uploaded = await uploadFile(formData).unwrap();
				await updateAvatar({ avatarUrl: uploaded.url }).unwrap();
			}
			await updateProfile({
				firstName: form.firstName.trim(),
				lastName: form.lastName.trim(),
				bio: form.bio?.trim() || null,
				city: form.city?.trim() || null,
			}).unwrap();
			notification.success('Профиль успешно обновлён');
			onSuccess?.();
		} catch {
			notification.error('Не удалось обновить профиль');
		}
	};

	return {
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
	};
};

export { useEditProfilePopup };
