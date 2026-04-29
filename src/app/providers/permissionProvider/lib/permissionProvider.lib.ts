import { getCookieValue } from '@shared/api';

import {
	ACCESS_TOKEN_COOKIE_NAME,
	AUTH_API_BASE_URL,
} from '../model/permissionProvider.consts';

import type { TokenState } from '../model/permissionProvider.types';

type JwtPayload = {
	exp?: number;
};

let isRefreshBlockedForMissingToken = false;
let refreshInFlight: Promise<boolean> | null = null;

const decodeBase64Url = (value: string): string | null => {
	try {
		const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64.padEnd(
			base64.length + ((4 - (base64.length % 4)) % 4),
			'=',
		);

		return atob(padded);
	} catch {
		return null;
	}
};

const getJwtPayload = (token: string): JwtPayload | null => {
	const parts = token.split('.');

	if (parts.length !== 3) {
		return null;
	}

	const payloadRaw = decodeBase64Url(parts[1]);
	if (!payloadRaw) {
		return null;
	}

	try {
		return JSON.parse(payloadRaw) as JwtPayload;
	} catch {
		return null;
	}
};

const getAccessTokenState = (): TokenState => {
	const token = getCookieValue(ACCESS_TOKEN_COOKIE_NAME);

	if (!token) {
		return 'missing';
	}

	const payload = getJwtPayload(token);
	if (!payload?.exp) {
		return 'invalid';
	}

	const expiresAt = payload.exp * 1000;
	if (expiresAt <= Date.now()) {
		return 'expired';
	}

	return 'valid';
};

const requestRefresh = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${AUTH_API_BASE_URL}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
		});

		return response.ok;
	} catch {
		return false;
	}
};

const tryRefreshSession = async (tokenState: TokenState) => {
	if (tokenState === 'missing' && isRefreshBlockedForMissingToken) {
		return false;
	}

	if (refreshInFlight) {
		return refreshInFlight;
	}

	refreshInFlight = (async () => {
		const success = await requestRefresh();

		if (success) {
			isRefreshBlockedForMissingToken = false;
			return true;
		}

		if (tokenState === 'missing') {
			isRefreshBlockedForMissingToken = true;
		}

		return false;
	})();

	try {
		return await refreshInFlight;
	} finally {
		refreshInFlight = null;
	}
};

const isAuthenticated = async (): Promise<boolean> => {
	const tokenState = getAccessTokenState();

	if (tokenState === 'valid') {
		return true;
	}

	if (
		tokenState === 'missing' ||
		tokenState === 'expired' ||
		tokenState === 'invalid'
	) {
		const refreshSucceeded = await tryRefreshSession(tokenState);
		if (!refreshSucceeded) {
			return false;
		}

		return getAccessTokenState() === 'valid';
	}

	return false;
};

export { isAuthenticated };
