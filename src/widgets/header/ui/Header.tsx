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
import { LinkBase } from '@shared/ui/links';
import { Avatar } from '@shared/ui/others';
import { UIText14SB } from '@shared/ui/paragraphs';
import { PaddingWrapper } from '@shared/ui/wrappers';

import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles['logo-wrapper']}>
				<LinkBase to={ROUTES.HOME}>
					<LogoHeader />
				</LinkBase>
				<UIText14SB>Сервис осознанного потребления</UIText14SB>
			</div>
			<div className={styles.panel}>
				<PaddingWrapper y={0} x={12}>
					<LinkBase to={ROUTES.NEW_PUBLICATION}>
						<ButtonBase tabIndex={-1}>
							<Plus />
							<UIText14SB>Разместить объявление</UIText14SB>
						</ButtonBase>
					</LinkBase>
				</PaddingWrapper>
				<Histogram />
				<Heart />
				<Bell />
				<LinkBase to={ROUTES.MESSAGES}>
					<Chat />
				</LinkBase>
				<LinkBase to={ROUTES.PROFILE}>
					<Avatar shape="circle" size="medium" src={img}></Avatar>
				</LinkBase>
			</div>
		</div>
	);
};

export { Header };
