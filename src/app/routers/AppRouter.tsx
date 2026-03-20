import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';

import { ROUTES } from '~~>shared/model/routes';
import { Limbo } from '~~>shared/ui/wrappers';

const HeaderLayout = lazy(() => import('~~>app/layouts/headerLayout'));
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
		element: (
			<Limbo>
				<HeaderLayout />
			</Limbo>
		),
		children: [
			{
				index: true,
				element: <h1>Главная</h1>,
			},
			{
				path: ROUTES.PROFILE,
				element: (
					<Limbo>
						<h1>Это профиль</h1>
						<Outlet />
					</Limbo>
				),
				children: [
					{
						index: true,
						element: (
							<Navigate to={ROUTES.PROFILE_MY_ADS} replace />
						),
					},
					{
						path: ROUTES.PROFILE_MY_ADS,
						element: <h1>Мои объявления</h1>,
					},
				],
			},
		],
	},
]);

export { router };
