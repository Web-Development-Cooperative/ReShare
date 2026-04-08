import { baseApi, apiTags } from '@shared/api';

import type {
	CategoriesListData,
	ListingsListParams,
	ListingsListData,
	CreateListingDto,
	ListingsDetailData,
	ListingsMyListParams,
	ListingsMyListData,
	ChangeStatusRequest,
	AddPhotoRequest,
	ListingsPhotosCreateData,
} from '@shared/api/generated/listings-api';

export const listingsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Категории
		getCategories: builder.query<CategoriesListData, void>({
			query: () => ({
				url: '/categories',
				method: 'GET',
			}),
			providesTags: [apiTags.Listings],
		}),

		// Список объявлений
		getListings: builder.query<ListingsListData, ListingsListParams>({
			query: (params) => ({
				url: '/listings',
				method: 'GET',
				params,
			}),
			providesTags: [apiTags.Listings],
		}),

		// Создание объявления
		createListing: builder.mutation<void, CreateListingDto>({
			query: (body) => ({
				url: '/listings',
				method: 'POST',
				body,
			}),
			invalidatesTags: [apiTags.Listings],
		}),

		// Детали объявления
		getListing: builder.query<ListingsDetailData, string>({
			query: (id) => ({
				url: `/listings/${id}`,
				method: 'GET',
			}),
			providesTags: [apiTags.Listings],
		}),

		// Обновление объявления
		updateListing: builder.mutation<
			void,
			{ id: string; data: CreateListingDto }
		>({
			query: ({ id, data }) => ({
				url: `/listings/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: [apiTags.Listings],
		}),

		// Удаление объявления
		deleteListing: builder.mutation<void, string>({
			query: (id) => ({
				url: `/listings/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [apiTags.Listings],
		}),

		// Мои объявления
		getMyListings: builder.query<ListingsMyListData, ListingsMyListParams>({
			query: (params) => ({
				url: '/listings/my',
				method: 'GET',
				params,
			}),
			providesTags: [apiTags.Listings],
		}),

		// Изменение статуса объявления
		updateListingStatus: builder.mutation<
			void,
			{ id: string; status: ChangeStatusRequest }
		>({
			query: ({ id, status }) => ({
				url: `/listings/${id}/status`,
				method: 'PATCH',
				body: status,
			}),
			invalidatesTags: [apiTags.Listings],
		}),

		// Добавление фото к объявлению
		addListingPhoto: builder.mutation<
			ListingsPhotosCreateData,
			{ id: string; photo: AddPhotoRequest }
		>({
			query: ({ id, photo }) => ({
				url: `/listings/${id}/photos`,
				method: 'POST',
				body: photo,
			}),
			invalidatesTags: [apiTags.Listings],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetListingsQuery,
	useCreateListingMutation,
	useGetListingQuery,
	useUpdateListingMutation,
	useDeleteListingMutation,
	useGetMyListingsQuery,
	useUpdateListingStatusMutation,
	useAddListingPhotoMutation,
} = listingsApi;
