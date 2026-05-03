import { useState } from 'react';
import { Outlet } from 'react-router';

import { clsx } from 'clsx';

import img from '@shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '@shared/ui/buttons';
import { Pencil, VectorShare } from '@shared/ui/icons';
import { Avatar, Rating, UniList } from '@shared/ui/others';
import {
	Paragraph16Reg,
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '@shared/ui/paragraphs';
import { NavLinkBase } from '@shared/ui/links';
import { BasePopup } from '@shared/ui/popups';
import { BgBorderDefault } from '@shared/ui/wrappers';

import { LIST_INFO, NAV, RATING } from '../lib/profilePage.consts';
import { EditProfilePopup } from './editProfilePopup/EditProfilePopup';
import styles from './ProfilePage.module.css';
import { RatingPopup } from './ratingPopup/RatingPopup';
import { SecondaryInfoCard } from './secondaryInfoCard/SecondaryInfoCard';

const ProfilePage = () => {
	const [openReview, setOpenReview] = useState(false);
	const [openEditProfile, setOpenEditProfile] = useState(false);

	return (
		<>
			<div className={styles['profile-page']}>
				<div className={styles['main-info-container']}>
					<Avatar shape="square" size="huge" src={img} />
					<div className={styles['main-info']}>
						<div className={styles['row-top']}>
							<h2>Аполлинария Владимировна</h2>
							<div className={styles['buttons-container']}>
								<ButtonBase
									color="brand"
									onClick={() =>
										setOpenEditProfile((cv) => !cv)
									}
								>
									<Pencil />
									<UIText14SB>
										Редактировать профиль
									</UIText14SB>
								</ButtonBase>
								<ButtonBase color="outline">
									<VectorShare />
									{/* <UIText14SB>Поделиться профилем</UIText14SB> */}
								</ButtonBase>
							</div>
						</div>
						<div className={styles['row-bottom']}>
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
				<div className={styles['row-bottom-two']}>
					<Rating rating={RATING} left size="medium" />
					<button onClick={() => setOpenReview((cv) => !cv)}>
						<UIText14Reg className={styles['reviews']}>
							24 отзыва
						</UIText14Reg>
					</button>
					<UIText14Reg>•</UIText14Reg>
					<Paragraph16Reg>На платформе с 2026</Paragraph16Reg>
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
							<NavLinkBase
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
							</NavLinkBase>
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
