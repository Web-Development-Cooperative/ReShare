import { LinkBase } from '@shared/ui/links';
import { ROUTES } from '@shared/model/routes';

import styles from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div className={styles.landing}>
			<h1>Это Лендинг</h1>
			<LinkBase to={ROUTES.LOGIN}>Вход</LinkBase>
		</div>
	);
};

export { LandingPage };
