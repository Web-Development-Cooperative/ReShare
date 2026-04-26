import { Link } from 'react-router';

import clsx from 'clsx';

import styles from './LinkBase.module.css';

import type { LinkBaseProps } from '@shared/model/links.types';

const LinkBase: LinkBaseProps = ({ className, children, ...props }) => {
	return (
		<Link className={clsx(styles.link, className)} {...props}>
			{children}
		</Link>
	);
};

export { LinkBase };
