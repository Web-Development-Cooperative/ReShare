import { NavLink } from 'react-router';

import clsx from 'clsx';

import styles from './NavLinkBase.module.css';

import type { NavLinkBaseProps } from '@shared/model/links.types';

const NavLinkBase: NavLinkBaseProps = ({ className, children, ...props }) => {
	return (
		<NavLink className={clsx(styles.link, className)} {...props}>
			{children}
		</NavLink>
	);
};

export { NavLinkBase };
