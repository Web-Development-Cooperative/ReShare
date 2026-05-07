import img from '@shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '@shared/ui/buttons';
import { Avatar, Tag, UniList } from '@shared/ui/others';
import { UIText14Medium, UIText14Reg, UIText14SB } from '@shared/ui/paragraphs';
import { PaddingWrapper } from '@shared/ui/wrappers';
import { InputBase } from '@shared/ui/inputs';

import styles from './EditProfilePopup.module.css';
import { PHONES } from '../../model/profilePage.consts';

const EditProfilePopup = () => {
	return (
		<div className={styles['edit-profile']}>
			<Avatar shape="circle" size="huge" src={img} />
			<div className={styles['name-container']}>
				<div className={styles.wrapper}>
					<h3>Имя</h3>
					<UIText14Reg>
						Как вы хотите, чтобы к вам обращались?
					</UIText14Reg>
				</div>
				<InputBase placeholder="Введите имя" />
			</div>
			<div className={styles['phones-container']}>
				<h3>Телефоны</h3>
				<UniList
					className={styles.phones}
					items={PHONES}
					renderItem={(item) => (
						<div className={styles.phone}>
							<UIText14Reg>{item.phone}</UIText14Reg>
							<Tag
								color={item.status ? 'green' : 'red'}
								size="medium"
								tagStyle="outline"
							>
								<UIText14Medium>
									{item.status
										? 'Подтвержден'
										: 'Не подтвержден'}
								</UIText14Medium>
							</Tag>
						</div>
					)}
				/>
				<ButtonBase color="outline">
					<PaddingWrapper y={0} x={8}>
						<UIText14SB>Добавить номер</UIText14SB>
					</PaddingWrapper>
				</ButtonBase>
			</div>
			<ButtonBase color="brand">
				<UIText14SB>Сохранить</UIText14SB>
			</ButtonBase>
		</div>
	);
};

export { EditProfilePopup };
