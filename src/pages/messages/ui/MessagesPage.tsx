import { Outlet } from 'react-router';

import { ButtonBase } from '~~>shared/ui/buttons';
import { ArrowLeft } from '~~>shared/ui/icons';
import { BgBorderDefault, PaddingWrapper } from '~~>shared/ui/wrappers';
import { Avatar, Tag, UniList } from '~~>shared/ui/others';
import {
	Paragraph16Reg,
	UIText14Medium,
	UIText14SB,
} from '~~>shared/ui/paragraphs';

import { MESSAGE_ARRAY } from '../lib/messagesPage.consts';
import styles from './MessagesPage.module.css';

const MessagesPage = () => {
	return (
		<div className={styles['messages-page']}>
			<div className={styles['title-container']}>
				<ButtonBase color="shaded">
					<ArrowLeft />
					<UIText14SB>Вернуться назад</UIText14SB>
				</ButtonBase>
				<h2>Сообщения</h2>
			</div>
			<div className={styles.main}>
				<BgBorderDefault
					className={styles.sidebar}
					colorType="surface-1"
				>
					<PaddingWrapper y={16} x={12}>
						<input placeholder="" />
					</PaddingWrapper>
					<UniList
						className={styles.chats}
						items={MESSAGE_ARRAY}
						renderItem={(item) => (
							<PaddingWrapper
								y={8}
								x={12}
								className={styles.chat}
							>
								<Avatar shape="square" size="large" />
								<div className={styles.content}>
									<h3>{item.fullName}</h3>
									<Paragraph16Reg>
										{item.descr}
									</Paragraph16Reg>
								</div>
								<Tag
									tagStyle="subtle"
									color="black"
									size="medium"
									className={styles.tag}
								>
									<UIText14Medium>
										{item.missed}
									</UIText14Medium>
								</Tag>
							</PaddingWrapper>
						)}
					/>
				</BgBorderDefault>
				<Outlet />
			</div>
		</div>
	);
};

export { MessagesPage };
