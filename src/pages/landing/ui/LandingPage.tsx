import { Link } from 'react-router';

import { ROUTES } from '@shared/model/routes';

import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={styles.landing}>
			<h1>Это Лендинг</h1>
			<Link to={ROUTES.LOGIN}>Вход</Link>
		</div>
	);
};

export { LandingPage };
