import { ReduxProvider } from '../../reduxProvider';

import type { MainProviderProps } from '../model/mainProvider.types';

const MainProvider: MainProviderProps = ({ children }) => {
	return <ReduxProvider>{children}</ReduxProvider>;
};

export { MainProvider };
