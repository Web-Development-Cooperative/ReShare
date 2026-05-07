import type { ButtonBase } from '@shared/ui/buttons';

type SettingsButtonType = {
	id: number;
	color: Parameters<typeof ButtonBase>[0]['color'];
	text: string;
	onClick: () => void;
};
type SettingsButtonsType = Array<SettingsButtonType>;

type EditFormData = {
	title: string;
	description: string;
	transferMethod: string;
	city: string;
	weightGrams: string;
};

type EditFormErrors = Partial<Record<keyof EditFormData, string>>;

export type { SettingsButtonsType, EditFormData, EditFormErrors };
