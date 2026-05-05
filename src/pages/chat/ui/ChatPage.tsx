import { ArrowRight, Plus } from '@shared/ui/icons';
import { Avatar, Tag } from '@shared/ui/others';
import { UIText12Reg, UIText14Medium, UIText14SB } from '@shared/ui/paragraphs';
import { ButtonBase } from '@shared/ui/buttons';
import { BgBorderDefault } from '@shared/ui/wrappers';
import { TextareaBase } from '@shared/ui/inputs';

import { CHAT_INTERLOCUTOR } from '../model/chatPage.consts';
import { useChatPage } from '../lib/useChatPage.hook';
import { ChatMessageItem } from './chatMessageItem/ChatMessageItem';
import styles from './ChatPage.module.css';

const ChatPage = () => {
	const {
		messages,
		inputValue,
		otherProfile,
		listing,
		changeValue,
		handleKeyDown,
		handleSend,
		messagesEndRef,
	} = useChatPage();
	return (
		<BgBorderDefault colorType="surface-1" className={styles.chat}>
			<BgBorderDefault colorType="surface-1" className={styles.header}>
				<Avatar
					shape="square"
					size="large"
					src={otherProfile?.avatarUrl || CHAT_INTERLOCUTOR.img}
					statusDot
				/>
				<div className={styles['header-info']}>
					<UIText14SB>
						{otherProfile?.firstName && otherProfile.lastName
							? `${otherProfile?.firstName} ${otherProfile?.lastName}`
							: CHAT_INTERLOCUTOR.fullName}
					</UIText14SB>
					<UIText12Reg>
						{listing || CHAT_INTERLOCUTOR.subject}
					</UIText12Reg>
				</div>
				<Tag
					tagStyle="filled"
					color="green"
					size="small"
					className={styles['header-tag']}
				>
					<UIText14Medium>{CHAT_INTERLOCUTOR.status}</UIText14Medium>
				</Tag>
			</BgBorderDefault>

			<div className={styles.messages}>
				{messages.map((msg) => (
					<ChatMessageItem key={msg.id} message={msg} />
				))}
				<div ref={messagesEndRef} />
			</div>

			<BgBorderDefault colorType="white" className={styles.footer}>
				<TextareaBase
					placeholder="Написать сообщение"
					value={inputValue}
					onChange={changeValue}
					onKeyDown={handleKeyDown}
				/>
				<div className={styles['footer-actions']}>
					<div className={styles['footer-left']}>
						<ButtonBase color="transparent">
							<Plus />
						</ButtonBase>
						<ButtonBase color="transparent">
							<span className={styles.emoji}>🙂</span>
						</ButtonBase>
					</div>
					<ButtonBase
						color="brand"
						className={styles['send-button']}
						onClick={handleSend}
					>
						<ArrowRight />
					</ButtonBase>
				</div>
			</BgBorderDefault>
		</BgBorderDefault>
	);
};

export { ChatPage };
