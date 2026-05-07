import { redirect } from 'react-router';

import { ROUTES } from '@shared/model/routes';

import { isAuthenticated } from './permissionProvider.lib';

import type { AuthProvider } from '../model/authProvider.model';

const createAuthProvider = (): AuthProvider => {
	return async () => {
		const authenticated = await isAuthenticated();

		if (!authenticated) {
			return redirect(ROUTES.LOGIN);
		}

		return null;
	};
};

export { createAuthProvider };
