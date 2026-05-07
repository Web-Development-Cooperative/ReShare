import { Outlet } from 'react-router';

import { BackButton } from '@features/backButton';
import { Loupe } from '@shared/ui/icons';
import { InputBase } from '@shared/ui/inputs';
import { UniList } from '@shared/ui/others';
import { BgBorderDefault, PaddingWrapper } from '@shared/ui/wrappers';

import { LinkChat } from './linkChat/LinkChat';
import { useMessagesPage } from '../lib/useMessagesPage.hook';
import styles from './MessagesPage.module.css';

const MessagesPage = () => {
	const { messages } = useMessagesPage();
	return (
		<div className={styles['messages-page']}>
			<div className={styles['title-container']}>
				<BackButton />
				<h2>Сообщения</h2>
			</div>
			<div className={styles.main}>
				<BgBorderDefault
					className={styles.sidebar}
					colorType="surface-1"
				>
					<PaddingWrapper y={0} x={0} className={styles.wrapper}>
						<InputBase
							placeholder="Поиск по чатам"
							leftIcon={<Loupe />}
						/>
					</PaddingWrapper>
					<UniList
						className={styles.chats}
						items={messages || []}
						renderItem={(item) => <LinkChat item={item} />}
					/>
				</BgBorderDefault>
				<Outlet />
			</div>
		</div>
	);
};

export { MessagesPage };
