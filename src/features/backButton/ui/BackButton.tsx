import { ButtonBase } from '~~>shared/ui/buttons';
import { ArrowLeft } from '~~>shared/ui/icons';
import { UIText14SB } from '~~>shared/ui/paragraphs';

import { useBackButton } from '../lib/useBackButton';

const BackButton = () => {
	const { handleGoBack } = useBackButton();

	return (
		<ButtonBase color="shaded" onClick={handleGoBack}>
			<ArrowLeft />
			<UIText14SB>Вернуться назад</UIText14SB>
		</ButtonBase>
	);
};

export { BackButton };
