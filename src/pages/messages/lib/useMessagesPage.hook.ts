import { useGetConversationsQuery } from '@entities/messages';
import { useGetMyProfileQuery } from '@entities/users';

const useMessagesPage = () => {
	const { data: messages } = useGetConversationsQuery({});
	const { data: user } = useGetMyProfileQuery();

	console.log(messages);
	return { messages: messages?.items, user };
};

export { useMessagesPage };
