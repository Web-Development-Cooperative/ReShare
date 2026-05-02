import type { ButtonBase } from '@shared/ui/buttons';

type SettingsButtonType = {
	id: number;
	color: Parameters<typeof ButtonBase>[0]['color'];
	text: string;
	onClick: () => void;
};
type SettingsButtonsType = Array<SettingsButtonType>;

export type { SettingsButtonsType };
