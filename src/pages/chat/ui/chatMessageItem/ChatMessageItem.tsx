import { Avatar } from '@shared/ui/others';
import { UIText12Reg, UIText14Medium, UIText14SB } from '@shared/ui/paragraphs';

import styles from './ChatMessageItem.module.css';

import type { ChatMessageItemProps } from '../../model/chatPage.types';

const ChatMessageItem: ChatMessageItemProps = ({ message }) => {
	console.log(message);
	return (
		<div className={styles.message}>
			<Avatar
				shape="square"
				size="medium"
				style={{ gridArea: 'avata' }}
				src={message.senderAvatar}
			/>
			<div className={styles['message-body']}>
				<div className={styles['message-header']}>
					<UIText14SB>{message.senderName}</UIText14SB>
					<UIText12Reg className={styles['message-time']}>
						{message.time}
					</UIText12Reg>
				</div>
				<UIText14Medium className={styles['message-text']}>
					{message.text}
				</UIText14Medium>
			</div>
		</div>
	);
};

export { ChatMessageItem };
