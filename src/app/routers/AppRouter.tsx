import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { ROUTES } from '~~>shared/model/routes';
import { Limbo } from '~~>shared/ui/wrappers';

const LoginPage = lazy(() => import('~~>pages/login'));
const LandingPage = lazy(() => import('~~>pages/landing'));

const router = createBrowserRouter([
	{
		path: ROUTES.LANDING,
		element: (
			<Limbo>
				<LandingPage />
			</Limbo>
		),
	},
	{
		path: ROUTES.LOGIN,
		element: (
			<Limbo>
				<LoginPage />
			</Limbo>
		),
	},
	{
		path: ROUTES.HOME,
		element: <Navigate to={ROUTES.LANDING} />,
	},
]);

export { router };
