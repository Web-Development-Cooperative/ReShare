import { RouterProvider } from 'react-router';

import { router } from '../../../routers';

const RoutProvider = () => {
	return <RouterProvider router={router} />;
};

export { RoutProvider };
