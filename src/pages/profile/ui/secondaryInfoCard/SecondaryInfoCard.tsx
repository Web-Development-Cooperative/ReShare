import { clsx } from 'clsx';

import { Heading36, UIText14Reg } from '@shared/ui/paragraphs';
import { BgBorderDefault, BgIcone } from '@shared/ui/wrappers';

import styles from './SecondaryInfoCard.module.css';
import { BASE_DATA } from '../../lib/profilePage.consts';

import type { SecondaryInfoCardProps } from '../../model/profilePage.types';

const SecondaryInfoCard: SecondaryInfoCardProps = ({
	className,
	typeCard,
	...props
}) => {
	return (
		<BgBorderDefault
			className={clsx(styles['card'], className)}
			colorType="white"
			{...props}
		>
			<div className={styles['type-card']}>
				<BgIcone>{BASE_DATA[typeCard].icon}</BgIcone>
				<div className={styles['text-contaier']}>
					<h3>{BASE_DATA[typeCard].title}</h3>
					<UIText14Reg>По состоянию на {'апрель 2026'}</UIText14Reg>
				</div>
			</div>
			<div className={styles['data']}>
				<Heading36>42</Heading36>
				<UIText14Reg className={styles['sec-text']}>
					+12.4% в этом месяце
				</UIText14Reg>
			</div>
		</BgBorderDefault>
	);
};

export { SecondaryInfoCard };
