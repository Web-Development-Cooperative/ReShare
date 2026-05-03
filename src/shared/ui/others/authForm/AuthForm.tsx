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
	errors,
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
			<div className={styles['inputs-content']}>
				<InputBase
					value={value?.login || value?.email || ''}
					onChange={onChange}
					name={typeForm === 'login' ? 'login' : 'email'}
					textLabel="Email"
					placeholder="Email"
					stateStyle={
						errors?.login || errors?.email ? 'error' : 'default'
					}
					helper={errors?.login || errors?.email}
				/>
				{typeForm === 'reg' && (
					<>
						<InputBase
							value={value?.firstName || ''}
							onChange={onChange}
							name="firstName"
							textLabel="Имя"
							placeholder="Имя"
							stateStyle={errors?.firstName ? 'error' : 'default'}
							helper={errors?.firstName}
						/>
						<InputBase
							value={value?.lastName || ''}
							onChange={onChange}
							name="lastName"
							textLabel="Фамилия"
							placeholder="Фамилия"
							stateStyle={errors?.lastName ? 'error' : 'default'}
							helper={errors?.lastName}
						/>
						<InputBase
							value={value?.phone || ''}
							onChange={onChange}
							name="phone"
							textLabel="Телефон"
							placeholder="Телефон"
							stateStyle={errors?.phone ? 'error' : 'default'}
							helper={errors?.phone}
						/>
					</>
				)}
				<InputBase
					value={value.password || ''}
					onChange={onChange}
					type={inputPasswordType}
					name="password"
					stateStyle={errors?.password ? 'error' : 'default'}
					helper={errors?.password || 'Как минимум 8 символов'}
					placeholder="Пароль"
					textLabel="Пароль"
					rightIcon={iconEye}
				/>
			</div>
			<ButtonBase onClick={onSubmit} color="brand" size="large">
				<UIText14SB>{textButton}</UIText14SB>
			</ButtonBase>

			<TextDivider label="Или" />

			<div className={styles['social-buttons']}>
				<ButtonBase color="outline">
					<div>
						<Google />
					</div>
					<UIText14SB>Войти через Google</UIText14SB>
				</ButtonBase>
				<ButtonBase color="outline">
					<div>
						<Apple />
					</div>
					<UIText14SB>Войти через Apple</UIText14SB>
				</ButtonBase>
			</div>
		</div>
	);
};

export { AuthForm };
