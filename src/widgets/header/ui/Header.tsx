import { Link } from 'react-router';

import img from '@shared/assets/img/baseAvatarMale.png';
import { ROUTES } from '@shared/model/routes';
import { ButtonBase } from '@shared/ui/buttons';
import {
	Bell,
	Chat,
	Heart,
	Histogram,
	LogoHeader,
	Plus,
} from '@shared/ui/icons';
import { Avatar } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { PaddingWrapper } from '@shared/ui/wrappers';

import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles['logo-wrapper']}>
				<Link to={ROUTES.HOME}>
					<LogoHeader />
				</Link>
				<UIText14SB>Сервис осознанного потребления</UIText14SB>
			</div>
			<div className={styles.panel}>
				<PaddingWrapper y={0} x={12}>
					<Link to={ROUTES.NEW_PUBLICATION}>
						<ButtonBase>
							<Plus />
							<UIText14SB>Разместить объявление</UIText14SB>
						</ButtonBase>
					</Link>
				</PaddingWrapper>
				<Histogram />
				<Heart />
				<Bell />
				<Link to={ROUTES.MESSAGES}>
					<Chat />
				</Link>
				<Link to={ROUTES.PROFILE}>
					<Avatar shape="circle" size="medium" src={img}></Avatar>
				</Link>
			</div>
		</div>
	);
};

export { Header };
