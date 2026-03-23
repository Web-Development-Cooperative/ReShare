import { Avatar, Tag } from '~~>shared/ui/others';
import { Paragraph16Reg, UIText14Medium } from '~~>shared/ui/paragraphs';
import { PaddingWrapper } from '~~>shared/ui/wrappers';

import styles from './LinkChat.module.css';
import type { FC } from 'react';
import type { Message } from '../../model/messagesPage.types';

const LinkChat: FC<Record<'item', Message>> = ({ item }) => {
	return (
		<PaddingWrapper y={8} x={12} className={styles.chat}>
			<Avatar
				shape="square"
				size="large"
				statusDot={true}
				src={item.img}
			/>
			<div className={styles.content}>
				<h3>{item.fullName}</h3>
				<Paragraph16Reg>{item.descr}</Paragraph16Reg>
			</div>
			<Tag
				tagStyle="subtle"
				color="black"
				size="medium"
				className={styles.tag}
			>
				<UIText14Medium>{item.missed}</UIText14Medium>
			</Tag>
		</PaddingWrapper>
	);
};

export { LinkChat };
