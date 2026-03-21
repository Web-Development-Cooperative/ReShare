import { createPortal } from 'react-dom';

import { usePopup } from '~~>shared/lib/popup.hooks';

import type { FC } from 'react';
import type { PopupPortalProps } from '~~>shared/model/popup.types';

const PopupPortal: FC<PopupPortalProps> = ({ children }) => {
	const container = usePopup();

	if (!container) return null;
	return createPortal(children, container);
};

export { PopupPortal };
