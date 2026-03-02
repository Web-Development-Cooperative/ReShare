import styles from './LoginPage.module.css';

const LoginPage = () => {
	return (
		<form action="" className={styles['login-form']}>
			<input type="text" />
			<input type="password" />
			<button>Click me!</button>
		</form>
	);
};

export { LoginPage };
