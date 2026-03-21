import { CrossPopup } from '~~>shared/ui/icons';
import { PaddingWrapper } from '~~>shared/ui/wrappers';

import { PopupPortal } from '../popupPortal/PopupPortal';
import styles from './BasePopup.module.css';
import type { FC } from 'react';
import type { BasePopupProps } from '~~>shared/model/popup.types';

const BasePopup: FC<BasePopupProps> = (props) => {
	const { setIsOpen, withCross = false, children } = props;

	return (
		<PopupPortal>
			<div
				className={styles['background']}
				onMouseDown={() => setIsOpen(false)}
			>
				<div
					className={styles['modal-responsible']}
					onMouseDown={(e) => e.stopPropagation()}
				>
					{withCross && (
						<PaddingWrapper
							y={16}
							x={16}
							className={styles.cross}
							onClick={() => setIsOpen(false)}
						>
							<CrossPopup />
						</PaddingWrapper>
					)}
					{children}
				</div>
			</div>
		</PopupPortal>
	);
};

export { BasePopup };
