import { CrossPopup } from '@shared/ui/icons';
import { PaddingWrapper } from '@shared/ui/wrappers';
import { ButtonBase } from '@shared/ui/buttons';

import styles from './BasePopup.module.css';
import { PopupPortal } from '../popupPortal/PopupPortal';

import type { BasePopupProps } from '@shared/model/popup.types';
import type { FC } from 'react';

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
							<ButtonBase>
								<CrossPopup />
							</ButtonBase>
						</PaddingWrapper>
					)}
					{children}
				</div>
			</div>
		</PopupPortal>
	);
};

export { BasePopup };
