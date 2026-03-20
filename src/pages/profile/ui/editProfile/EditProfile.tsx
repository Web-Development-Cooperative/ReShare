import { Avatar, Tag, UniList } from '~~>shared/ui/others';
import { ButtonBase } from '~~>shared/ui/buttons';
import {
	UIText14Medium,
	UIText14Reg,
	UIText14SB,
} from '~~>shared/ui/paragraphs';
import img from '~~>shared/assets/img/baseAvatarMale.png';

import { PHONES } from '../../lib/profilePage.consts';

const EditProfile = () => {
	return (
		<div className="edit-profile">
			<Avatar shape="circle" size="huge" src={img} />
			<div className="name-container">
				<div className="wrapper">
					<h3>Имя</h3>
					<UIText14Reg>
						Как вы хотите, чтобы к вам обращались?
					</UIText14Reg>
				</div>
				<input type="text" />
			</div>
			<div className="phones-container">
				<h3>Телефоны</h3>
				<UniList
					className="phones"
					items={PHONES}
					renderItem={(item) => (
						<div className="phone">
							<UIText14Reg>{item.phone}</UIText14Reg>
							<Tag color="green" size="medium" tagStyle="outline">
								<UIText14Medium>Подтвержден</UIText14Medium>
							</Tag>
						</div>
					)}
				/>
				<ButtonBase withBorder>
					<UIText14SB>Добавить номер</UIText14SB>
				</ButtonBase>
			</div>
			<ButtonBase color="primary">
				<UIText14SB>Сохранить</UIText14SB>
			</ButtonBase>
		</div>
	);
};

export { EditProfile };
