import { Avatar, Tag } from '@shared/ui/others';
import { Paragraph16Reg, UIText14Medium } from '@shared/ui/paragraphs';
import { LinkBase } from '@shared/ui/links';
import { ROUTES } from '@shared/model/routes';

import { useMessagesPage } from '../../lib/useMessagesPage.hook';
import styles from './LinkChat.module.css';

import type { FC } from 'react';
import type { ConversationDto } from '@shared/api/generated/messaging-api';

const LinkChat: FC<Record<'item', ConversationDto>> = ({ item }) => {
	const { user } = useMessagesPage();
	return (
		<LinkBase
			to={ROUTES.CHAT.replace(':chatId', item.id.toString())}
			className={styles.chat}
		>
			<Avatar
				shape="square"
				size="large"
				statusDot={true}
				src={
					item.participants.find((p) => p.id !== user?.id)
						?.avatarUrl || 'asdf'
				}
			/>
			<div className={styles.content}>
				<h3>
					{`${item.participants.find((p) => p.id !== user?.id)?.firstName} ${item.participants.find((p) => p.id !== user?.id)?.lastName}`}
				</h3>
				<Paragraph16Reg>{item.listing?.title}</Paragraph16Reg>
			</div>
			<Tag
				tagStyle="subtle"
				color="black"
				size="medium"
				className={styles.tag}
			>
				<UIText14Medium>{item.unreadCount}</UIText14Medium>
			</Tag>
		</LinkBase>
	);
};

export { LinkChat };
