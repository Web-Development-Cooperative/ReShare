import styles from './BgIcon.module.css';

import type { FC, PropsWithChildren } from 'react';

const BgIcone: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles['bg-icon']}>{children}</div>;
};

export { BgIcone };
