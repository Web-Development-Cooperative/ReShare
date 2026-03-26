import { Link } from 'react-router';

import { RegForm } from '@features/registration';
import { LogoHeader } from '@shared/ui/icons';
import { UIText12Reg } from '@shared/ui/paragraphs';

import styles from './RegPage.module.css';

const RegPage = () => {
	return (
		<div className={styles['login-page']}>
			<LogoHeader />
			<RegForm />
			<UIText12Reg className={styles['footer-text']}>
				Продолжая вход или регистрацию, вы соглашаетесь
				<Link to={'#'} className={styles['footer-link']}>
					с условиями
				</Link>
				сервиса и подтверждаете что ознакомились
				<Link to={'#'} className={styles['footer-link']}>
					с политикой конфиденциальности
				</Link>
				.
			</UIText12Reg>
		</div>
	);
};

export { RegPage };
