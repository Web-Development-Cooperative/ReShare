import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { authProvider, guestProvider } from '@app/providers/permissionProvider';
import { ROUTES } from '@shared/model/routes';
import { Limbo } from '@shared/ui/wrappers';

const HeaderLayout = lazy(() => import('@app/layouts/headerLayout'));
const LoginPage = lazy(() => import('@pages/login'));
const RegPage = lazy(() => import('@pages/registration'));
const LandingPage = lazy(() => import('@pages/landing'));
const ProfilePage = lazy(() => import('@pages/profile'));
const MessagesPage = lazy(() => import('@pages/messages'));
const AdsPage = lazy(() => import('@pages/main'));
const NewPublicationPage = lazy(() => import('@pages/newPublication'));

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
		loader: guestProvider,
		element: (
			<Limbo>
				<LoginPage />
			</Limbo>
		),
	},
	{
		path: ROUTES.REG,
		loader: guestProvider,
		element: (
			<Limbo>
				<RegPage />
			</Limbo>
		),
	},
	{
		path: ROUTES.HOME,
		loader: authProvider,
		element: (
			<Limbo>
				<HeaderLayout />
			</Limbo>
		),
		children: [
			{
				index: true,
				element: <Navigate to={ROUTES.ADS} replace />,
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
			{
				path: ROUTES.NEW_PUBLICATION,
				element: (
					<Limbo>
						<NewPublicationPage />
					</Limbo>
				),
			},
		],
	},
]);

export { router };
