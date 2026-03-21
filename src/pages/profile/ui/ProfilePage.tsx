import { useState } from 'react';
import { clsx } from 'clsx';
import { NavLink, Outlet } from 'react-router';

import { Avatar, Rating, UniList } from '~~>shared/ui/others';
import img from '~~>shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '~~>shared/ui/buttons';
import { Pencil, Share } from '~~>shared/ui/icons';
import {
	Paragraph16Reg,
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '~~>shared/ui/paragraphs';
import { BgBorderDefault } from '~~>shared/ui/wrappers';
import { BasePopup } from '~~>shared/ui/popups';

import { LIST_INFO, NAV, RATING } from '../lib/profilePage.consts';
import { SecondaryInfoCard } from './secondaryInfoCard/SecondaryInfoCard';
import { RatingPopup } from './ratingPopup/RatingPopup';
import { EditProfilePopup } from './editProfilePopup/EditProfilePopup';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
	const [openReview, setOpenReview] = useState(false);
	const [openEditProfile, setOpenEditProfile] = useState(false);

	return (
		<>
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
								<ButtonBase
									onClick={() =>
										setOpenEditProfile((cv) => !cv)
									}
									withBorder
								>
									<Pencil />
									<UIText14SB>
										Редактировать профиль
									</UIText14SB>
								</ButtonBase>
							</div>
						</div>
						<div className={styles['row']}>
							<Rating rating={RATING} left size="medium" />
							<button onClick={() => setOpenReview((cv) => !cv)}>
								<UIText14Reg className={styles['reviews']}>
									24 отзыва
								</UIText14Reg>
							</button>
							<UIText14Reg>•</UIText14Reg>
							<Paragraph16Reg>На платформе с 2026</Paragraph16Reg>
						</div>
					</div>
				</div>
				<UniList
					className={styles['secondary-info-container']}
					items={LIST_INFO}
					renderItem={(item) => (
						<SecondaryInfoCard typeCard={item.id} />
					)}
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
										<UIText14Medium>
											{item.text}
										</UIText14Medium>
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
			{openReview && (
				<BasePopup setIsOpen={setOpenReview} withCross>
					<RatingPopup />
				</BasePopup>
			)}
			{openEditProfile && (
				<BasePopup setIsOpen={setOpenEditProfile} withCross>
					<EditProfilePopup />
				</BasePopup>
			)}
		</>
	);
};

export { ProfilePage };
