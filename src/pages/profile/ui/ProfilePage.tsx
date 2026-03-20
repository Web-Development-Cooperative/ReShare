import { Link, Outlet } from 'react-router';

import { Avatar, UniList } from '~~>shared/ui/others';
import img from '~~>shared/assets/img/baseAvatarMale.png';
import { ButtonBase } from '~~>shared/ui/buttons/inex';
import { Asterisk, Pencil, Share, Star } from '~~>shared/ui/icons';
import {
	Paragraph16Reg,
	UIText14Reg,
	UIText14SB,
} from '~~>shared/ui/paragraphs';

const MAX_RATING = 5;
const RATING = 3.7;

const ProfilePage = () => {
	return (
		<div className="profile-page">
			<div className="main-info-container">
				<Avatar shape="square" size="huge" src={img} />
				<div className="main-info">
					<div className="row">
						<h2>Аполлинария Владимировна</h2>
						<div className="buttons-container">
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
					<div className="row">
						<div className="rating">
							<UIText14SB>4.9</UIText14SB>
							<UniList
								items={Array.from(
									{ length: MAX_RATING },
									(_, i) => ({
										id: i + 1,
									})
								)}
								renderItem={(item) =>
									Math.round(RATING) < item.id ? (
										<Asterisk />
									) : (
										<Star />
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
			<div className="secondary-info-container"></div>
			<div className="nav-panel"></div>
			<Outlet />
		</div>
	);
};

export { ProfilePage };
