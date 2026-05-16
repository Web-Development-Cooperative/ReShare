import clsx from 'clsx';

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

import { useHeader } from '../lib/useHeader.hook';
import styles from './Header.module.css';

const Header = () => {
	const { profile, isMobileMenuOpen, toggleMenu, handleLinkClick } =
		useHeader();

	return (
		<div className={styles.header}>
			<div className={styles['logo-wrapper']}>
				<LinkBase to={ROUTES.HOME}>
					<LogoHeader />
				</LinkBase>
				<UIText14SB className={styles['logo-text']}>
					Сервис осознанного потребления
				</UIText14SB>
			</div>
			<div className={styles['desktop-panel']}>
				<PaddingWrapper y={0} x={12}>
					<LinkBase to={ROUTES.NEW_PUBLICATION}>
						<ButtonBase tabIndex={-1}>
							<Plus />
							<UIText14SB>Разместить объявление</UIText14SB>
						</ButtonBase>
					</LinkBase>
				</PaddingWrapper>
				<LinkBase to={ROUTES.LEADERBOARD}>
					<Histogram />
				</LinkBase>
				<Heart />
				<Bell />
				<LinkBase to={ROUTES.MESSAGES}>
					<Chat />
				</LinkBase>
				<LinkBase to={ROUTES.PROFILE}>
					<Avatar
						shape="circle"
						size="medium"
						src={profile?.avatarUrl ?? undefined}
					></Avatar>
				</LinkBase>
			</div>
			<div className={styles['mobile-menu']}>
				<PaddingWrapper y={0} x={4}>
					<LinkBase to={ROUTES.NEW_PUBLICATION}>
						<ButtonBase tabIndex={-1}>
							<Plus />
							<UIText14SB>Разместить объявление</UIText14SB>
						</ButtonBase>
					</LinkBase>
				</PaddingWrapper>
				<button
					className={styles['burger-button']}
					onClick={toggleMenu}
					aria-label="Открыть меню"
				>
					{isMobileMenuOpen ? 'X' : ':::'}
				</button>
			</div>
			<div
				className={clsx(styles['burger-menu'], {
					[styles['mobile-menu--open']]: isMobileMenuOpen,
				})}
			>
				<div className={styles['mobile-menu-content']}>
					<nav className={styles['mobile-nav']}>
						<LinkBase
							to={ROUTES.LEADERBOARD}
							onClick={handleLinkClick}
							className={styles['mobile-link']}
						>
							<Histogram /> Статистика
						</LinkBase>
						<LinkBase
							to="#"
							onClick={handleLinkClick}
							className={styles['mobile-link']}
						>
							<Heart /> Избранное
						</LinkBase>
						<LinkBase
							to="#"
							onClick={handleLinkClick}
							className={styles['mobile-link']}
						>
							<Bell /> Уведомления
						</LinkBase>
						<LinkBase
							to={ROUTES.MESSAGES}
							onClick={handleLinkClick}
							className={styles['mobile-link']}
						>
							<Chat /> Сообщения
						</LinkBase>
						<LinkBase
							to={ROUTES.PROFILE}
							onClick={handleLinkClick}
							className={styles['mobile-link']}
						>
							<Avatar
								shape="circle"
								size="small"
								src={profile?.avatarUrl ?? undefined}
								alt="Profile"
							/>{' '}
							Профиль
						</LinkBase>
					</nav>
				</div>
			</div>
		</div>
	);
};

export { Header };
