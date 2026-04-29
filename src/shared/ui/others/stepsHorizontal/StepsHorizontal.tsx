import styles from './StepsHorizontal.module.css';

import type { StepsHorizontalProps } from '@shared/model/otherUI.types';

const StepsHorizontal: StepsHorizontalProps = ({ steps, currentStep }) => {
	return (
		<div className={styles['steps-horizontal']}>
			{Array.from({ length: steps }, (_, i) => i + 1).map((step) => {
				const styleDot =
					step < currentStep
						? 'Completed'
						: step === currentStep
							? 'Current'
							: 'Upcoming';

				return (
					<div key={step} className={styles.step}>
						<div className={styles.status}>
							<div className={styles['progressDot' + styleDot]} />
							{step !== steps && (
								<div className={styles['track' + styleDot]} />
							)}
						</div>
						<div className={styles.content}>
							{/* Тут должно быть описание шага */}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export { StepsHorizontal };
