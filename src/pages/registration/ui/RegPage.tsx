import { RegForm } from '@features/registration';
import { LinkBase } from '@shared/ui/links';
import { LogoHeader } from '@shared/ui/icons';
import { UIText12Reg } from '@shared/ui/paragraphs';

import styles from './RegPage.module.css';

const RegPage = () => {
	return (
		<div className={styles['login-page']}>
			<LogoHeader />
			<RegForm />
			<UIText12Reg className={styles['footer-text']}>
				Продолжая вход или регистрацию, вы соглашаетесь{' '}
				<LinkBase to={'#'} className={styles['footer-link']}>
					с условиями
				</LinkBase>{' '}
				сервиса и подтверждаете что ознакомились{' '}
				<LinkBase to={'#'} className={styles['footer-link']}>
					с политикой конфиденциальности
				</LinkBase>
				.
			</UIText12Reg>
		</div>
	);
};

export { RegPage };
