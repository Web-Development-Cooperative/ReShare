import { Paragraph16Reg, UIText14SB } from '@shared/ui/paragraphs';
import { ButtonBase } from '@shared/ui/buttons';
import { Apple, Google } from '@shared/ui/icons';
import { TextDivider } from '@shared/ui/others';
import { InputBase } from '@shared/ui/inputs';
import { useAuthForm } from '@shared/lib/otherUI.hooks';

import styles from './AuthForm.module.css';

import type { AuthFormProps } from '@shared/model/otherUI.types';

const AuthForm: AuthFormProps = ({
	typeForm,
	value,
	onChange,
	onSubmit,
	...props
}) => {
	const { title, textButton, inputPasswordType, iconEye } =
		useAuthForm(typeForm);
	return (
		<div className={styles['auth-form']} {...props}>
			<div className={styles['text-content']}>
				<h1>{title}</h1>
				<Paragraph16Reg>
					Станьте частью сообщества, где хорошие вещи находят новых
					владельцев, а полезные ресурсы не превращаются в отходы.
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
					value={value?.login || value?.email || ''}
					onChange={onChange}
					name="login"
					textLabel="Email"
					placeholder="Email"
				/>
				<InputBase
					value={value.password || ''}
					onChange={onChange}
					type={inputPasswordType}
					name="password"
					helper="Как минимум 8 символов"
					placeholder="Пароль"
					textLabel="Пароль"
					rightIcon={iconEye}
				/>
			</div>
			<ButtonBase onClick={onSubmit} color="brand" size="large">
				<UIText14SB>{textButton}</UIText14SB>
			</ButtonBase>
		</div>
	);
};

export { AuthForm };
