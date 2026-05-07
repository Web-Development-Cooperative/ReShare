import { Heading24, Paragraph14Reg } from '@shared/ui/paragraphs';

import styles from './RenderStepFour.module.css';

const COUNT = 200;

const RenderStepFour = () => {
	return (
		<>
			<div className={styles.top}>
				<span className={styles.checkmark}>
					<h3>✓</h3>
				</span>
				<div className={styles['top-text']}>
					<h3>Объявление опубликовано</h3>
					<Paragraph14Reg>
						После небольшой проверки оно станет доступно всем
						<br />
						пользователям сервиса
					</Paragraph14Reg>
				</div>
			</div>

			<div className={styles['bottom-text']}>
				<Heading24>{COUNT} кг</Heading24>
				<Paragraph14Reg>
					Будет спасено от захоронения на
					<br />
					полигоне
				</Paragraph14Reg>
			</div>
		</>
	);
};

export { RenderStepFour };
