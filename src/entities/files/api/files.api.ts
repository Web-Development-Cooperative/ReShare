import { baseApi, apiTags } from '@shared/api';

import type {
	FilesUploadCreateData,
	FilesDeleteParams,
	FilesUrlListData,
	FilesUrlListParams,
} from '@shared/api/generated/files-api';

export const filesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Загрузка файла
		uploadFile: builder.mutation<FilesUploadCreateData, FormData>({
			query: (body) => ({
				url: '/files/upload',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Files],
		}),

		// Удаление файла
		deleteFile: builder.mutation<void, FilesDeleteParams>({
			query: ({ id }) => ({
				url: `/files/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [apiTags.Files],
		}),

		// Получение URL файла
		getFileUrl: builder.query<FilesUrlListData, FilesUrlListParams>({
			query: ({ id }) => ({
				url: `/files/${id}/url`,
				method: 'GET',
			}),
			providesTags: [apiTags.Files],
		}),
	}),
});

export const {
	useUploadFileMutation,
	useDeleteFileMutation,
	useGetFileUrlQuery,
} = filesApi;
