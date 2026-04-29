import { toast } from 'react-toastify';

import { TOAST_OPTIONS } from './toast.config';

import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ToastContent, ToastOptions } from 'react-toastify';

const notify = (
	message: ToastContent,
	type: 'success' | 'error' | 'info' | 'loading' | 'warning' = 'info',
	options?: ToastOptions,
) => {
	toast[type](message, { ...TOAST_OPTIONS[type], ...options });
};

export const getErrorMessage = (
	error: FetchBaseQueryError | SerializedError,
): string => {
	if ('data' in error && error.data) {
		const data = error.data as unknown as {
			message?: string;
			title?: string;
		};
		return data.message || data.title || JSON.stringify(data);
	}
	if ('error' in error && error.error) {
		return error.error;
	}
	return 'Произошла неизвестная ошибка';
};

export const notification = {
	success: (message: string, options?: ToastOptions) =>
		notify(message, 'success', options),

	error: (
		message: string | FetchBaseQueryError | SerializedError,
		options?: ToastOptions,
	) => {
		const msg =
			typeof message === 'string' ? message : getErrorMessage(message);
		notify(msg, 'error', options);
	},

	info: (message: string, options?: ToastOptions) =>
		notify(message, 'info', options),

	warning: (message: string, options?: ToastOptions) =>
		notify(message, 'warning', options),

	loading: (message: string, options?: ToastOptions) =>
		toast.loading(message, { ...TOAST_OPTIONS.loading, ...options }),

	dismiss: (toastId: string | number) => toast.dismiss(toastId),

	promise: <T>(
		promise: Promise<T>,
		messages: {
			pending: string;
			success: string;
			error:
				| string
				| ((
						e: unknown | FetchBaseQueryError | SerializedError,
				  ) => string);
		},
	) => {
		toast.promise(promise, {
			pending: messages.pending,
			success: { render: messages.success, ...TOAST_OPTIONS.success },
			error: {
				render: (props) => {
					const err = props.data;
					return typeof messages.error === 'function'
						? messages.error(err)
						: messages.error;
				},
				...TOAST_OPTIONS.error,
			},
		});
		return promise;
	},
};
