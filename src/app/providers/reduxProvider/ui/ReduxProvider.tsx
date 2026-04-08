import { Provider } from 'react-redux';

import { store } from '@app/store';

import type { ReduxProviderProps } from '../model/reduxProvider.types';

export const ReduxProvider: ReduxProviderProps = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
