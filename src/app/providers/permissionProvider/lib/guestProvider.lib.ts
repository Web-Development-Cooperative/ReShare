import { redirect } from 'react-router';

import { ROUTES } from '@shared/model/routes';

import { isAuthenticated } from './permissionProvider.lib';

import type { GuestProvider } from '../model/guestProvider.types';

const createGuestProvider = (): GuestProvider => {
	return async () => {
		const authenticated = await isAuthenticated();

		if (authenticated) {
			return redirect(ROUTES.ADS);
		}

		return null;
	};
};

export { createGuestProvider };
