import { Outlet } from 'react-router';

import { Header } from '~~>widgets/header';

const HeaderLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export { HeaderLayout };
