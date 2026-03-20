import { clsx } from 'clsx';
import { Link, NavLink, Outlet } from 'react-router';

import { Avatar, UniList } from '~~>shared/ui/others';
import img from '~~>shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '~~>shared/ui/buttons';
import { Pencil, Share, StarFull, StarHollow } from '~~>shared/ui/icons';
import {
	Paragraph16Reg,
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '~~>shared/ui/paragraphs';
import { BgBorderDefault } from '~~>shared/ui/wrappers';

import { LIST_INFO, MAX_RATING, NAV, RATING } from '../lib/profilePage.consts';
import { SecondaryInfoCard } from './secondaryInfoCard/SecondaryInfoCard';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
	return (
		<div className={styles['profile-page']}>
			<div className={styles['main-info-container']}>
				<Avatar shape="square" size="huge" src={img} />
				<div className={styles['main-info']}>
					<div className={styles['row']}>
						<h2>Аполлинария Владимировна</h2>
						<div className={styles['buttons-container']}>
							<ButtonBase withBorder>
								<Share />
								<UIText14SB>Поделиться профилем</UIText14SB>
							</ButtonBase>
							<ButtonBase withBorder>
								<Pencil />
								<UIText14SB>Редактировать профиль</UIText14SB>
							</ButtonBase>
						</div>
					</div>
					<div className={styles['row']}>
						<div className={styles['rating']}>
							<UIText14SB>4.9</UIText14SB>
							<UniList
								className={styles.stars}
								items={Array.from(
									{ length: MAX_RATING },
									(_, i) => ({
										id: i + 1,
									})
								)}
								renderItem={(item) =>
									Math.round(RATING) < item.id ? (
										<StarHollow />
									) : (
										<StarFull />
									)
								}
							/>
						</div>
						<Link to="#">
							<UIText14Reg>24 отзыва</UIText14Reg>
						</Link>
						<UIText14Reg>•</UIText14Reg>
						<Paragraph16Reg>На платформе с 2026</Paragraph16Reg>
					</div>
				</div>
			</div>
			<UniList
				className={styles['secondary-info-container']}
				items={LIST_INFO}
				renderItem={(item) => <SecondaryInfoCard typeCard={item.id} />}
			/>
			<BgBorderDefault colorType="surface-1" className="nav-panel">
				<UniList
					className={styles['nav-list']}
					items={NAV}
					renderItem={(item) => (
						<NavLink
							to={item.to}
							className={({ isActive }) =>
								clsx(styles['nav-item'], {
									[styles['activ-link']]: isActive,
								})
							}
						>
							{({ isActive }) =>
								isActive ? (
									<UIText14Medium>{item.text}</UIText14Medium>
								) : (
									<UIText14Reg>{item.text}</UIText14Reg>
								)
							}
						</NavLink>
					)}
				/>
			</BgBorderDefault>
			<Outlet />
		</div>
	);
};

export { ProfilePage };
