import { clsx } from 'clsx';

import { Heading36, UIText14Reg } from '@shared/ui/paragraphs';
import { BgBorderDefault, BgIcone } from '@shared/ui/wrappers';
import { Box, Leaves, Turnover } from '@shared/ui/icons';

import styles from './SecondaryInfoCard.module.css';

import type { SecondaryInfoCardProps } from '../../model/profilePage.types';

const SecondaryInfoCard: SecondaryInfoCardProps = ({
	className,
	metric,
	...props
}) => {
	return (
		<BgBorderDefault
			className={clsx(styles['card'], className)}
			colorType="white"
			{...props}
		>
			<div className={styles['type-card']}>
				<BgIcone>
					{metric.id === '1' ? (
						<Box />
					) : metric.id === '2' ? (
						<Leaves />
					) : (
						<Turnover />
					)}
				</BgIcone>
				<div className={styles['text-contaier']}>
					<h3>{metric.title}</h3>
					<UIText14Reg>По состоянию на {'апрель 2026'}</UIText14Reg>
				</div>
			</div>
			<div className={styles['data']}>
				<Heading36>{metric.data}</Heading36>
				<UIText14Reg className={styles['sec-text']}>
					{metric.description}
				</UIText14Reg>
			</div>
		</BgBorderDefault>
	);
};

export { SecondaryInfoCard };
