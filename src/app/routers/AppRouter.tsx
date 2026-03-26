import { lazy } from 'react';
import { createBrowserRouter, Navigate, NavLink } from 'react-router';

import { ROUTES } from '@shared/model/routes';
import { Limbo } from '@shared/ui/wrappers';

const HeaderLayout = lazy(() => import('@app/layouts/headerLayout'));
const LoginPage = lazy(() => import('@pages/login'));
const RegPage = lazy(() => import('@pages/registration'));
const LandingPage = lazy(() => import('@pages/landing'));
const ProfilePage = lazy(() => import('@pages/profile'));
const MessagesPage = lazy(() => import('@pages/messages'));
const AdsPage = lazy(() => import('@pages/main'));

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
		path: ROUTES.REG,
		element: (
			<Limbo>
				<RegPage />
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
				element: (
					<>
						<h1>Главная</h1>
						<NavLink to={ROUTES.PROFILE}>Профиль</NavLink>
					</>
				),
			},
			{
				path: ROUTES.ADS,
				element: (
					<Limbo>
						<AdsPage />
					</Limbo>
				),
			},
			{
				path: ROUTES.PROFILE,
				element: (
					<Limbo>
						<ProfilePage />
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
					{
						path: ROUTES.PROFILE_MY_APPLICATIONS,
						element: <h1>Мои заявки</h1>,
					},
					{
						path: ROUTES.PROFILE_MY_ECO,
						element: <h1>Эковклад</h1>,
					},
					{
						path: ROUTES.PROFILE_MY_ARCHIVE,
						element: <h1>Архив объявлений</h1>,
					},
				],
			},
			{
				path: ROUTES.MESSAGES,
				element: (
					<Limbo>
						<MessagesPage />
					</Limbo>
				),
			},
		],
	},
]);

export { router };
