import type { ToastOptions } from 'react-toastify';

export const TOAST_CONFIG = {
	position: 'top-right' as const,
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'colored' as const,
};

export const TOAST_OPTIONS: Record<string, ToastOptions> = {
	success: { ...TOAST_CONFIG, type: 'success' },
	error: { ...TOAST_CONFIG, type: 'error', autoClose: 8000 },
	info: { ...TOAST_CONFIG, type: 'info' },
	warning: { ...TOAST_CONFIG, type: 'warning' },
	loading: { ...TOAST_CONFIG, type: 'default', isLoading: true },
};
