import { Outlet } from 'react-router';

import { BackButton } from '~~>features/backButton';
import { Loupe } from '~~>shared/ui/icons';
import { BgBorderDefault, PaddingWrapper } from '~~>shared/ui/wrappers';
import { UniList } from '~~>shared/ui/others';
import { InputBase } from '~~>shared/ui/inputs';

import { MESSAGE_ARRAY } from '../lib/messagesPage.consts';
import { LinkChat } from './linkChat/LinkChat';
import styles from './MessagesPage.module.css';

const MessagesPage = () => {
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
					<PaddingWrapper y={16} x={12}>
						<InputBase
							placeholder="Поиск по чатам"
							leftIcon={<Loupe />}
						/>
					</PaddingWrapper>
					<UniList
						className={styles.chats}
						items={MESSAGE_ARRAY}
						renderItem={(item) => <LinkChat item={item} />}
					/>
				</BgBorderDefault>
				<Outlet />
			</div>
		</div>
	);
};

export { MessagesPage };
