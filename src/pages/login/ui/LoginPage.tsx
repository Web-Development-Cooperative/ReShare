import { Link } from 'react-router';

import { TextDivider } from '@shared/ui/others';
import { ButtonBase } from '@shared/ui/buttons';
import { Apple, EyeOpen, Google, LogoHeader } from '@shared/ui/icons';
import { InputBase } from '@shared/ui/inputs';
import { Paragraph16Reg, UIText12Reg, UIText14SB } from '@shared/ui/paragraphs';

import styles from './LoginPage.module.css';

const LoginPage = () => {
	return (
		<div className={styles['login-page']}>
			<LogoHeader />
			<div className={styles['login-form']}>
				<div className={styles['text-content']}>
					<h1>Войти в аккаунт</h1>
					<Paragraph16Reg>
						Станьте частью сообщества, где хорошие вещи находят
						новых владельцев, а полезные ресурсы не превращаются в
						отходы.
					</Paragraph16Reg>
				</div>
				<div className={styles['social-buttons']}>
					<ButtonBase withBorder>
						<Google />
						<UIText14SB>Войти через Google</UIText14SB>
					</ButtonBase>
					<ButtonBase withBorder>
						<Apple />
						<UIText14SB>Войти через Apple</UIText14SB>
					</ButtonBase>
				</div>
				<TextDivider label="Или" />
				<div className={styles['inputs-content']}>
					<InputBase
						name="email"
						textLabel="Email"
						placeholder="Email"
					/>
					<InputBase
						type="password"
						name="password"
						helper="Как минимум 8 символов"
						placeholder="Пароль"
						textLabel="Пароль"
						rightIcon={<EyeOpen />}
					/>
				</div>
				<ButtonBase color="primary" size="large">
					<UIText14SB>Войти</UIText14SB>
				</ButtonBase>
			</div>
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

export { LoginPage };
