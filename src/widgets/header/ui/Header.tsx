import { Link } from 'react-router';

import { ROUTES } from '~~>shared/model/routes';
import { ButtonBase } from '~~>shared/ui/buttons/inex';
import {
	Bell,
	Chat,
	Heart,
	Histogram,
	LogoHeader,
	Plus,
} from '~~>shared/ui/icons';
import { Avatar } from '~~>shared/ui/others';
import { UIText14SB } from '~~>shared/ui/paragraphs';
import { PaddingWrapper } from '~~>shared/ui/wrappers';
import img from '~~>shared/assets/img/baseAvatarMale.png';

import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles['logo-wrapper']}>
				<Link to={ROUTES.HOME}>
					<LogoHeader></LogoHeader>
				</Link>
				<UIText14SB>Сервис осознанного потребления</UIText14SB>
			</div>
			<div className={styles.panel}>
				<PaddingWrapper y={0} x={12}>
					<ButtonBase>
						<Plus />
						<UIText14SB>Разместить объявление</UIText14SB>
					</ButtonBase>
				</PaddingWrapper>
				<Histogram />
				<Heart />
				<Bell />
				<Chat />
				<Link to={ROUTES.PROFILE}>
					<Avatar shape="circle" size="medium" src={img}></Avatar>
				</Link>
			</div>
		</div>
	);
};

export { Header };
