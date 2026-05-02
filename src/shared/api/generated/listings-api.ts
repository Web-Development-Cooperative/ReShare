/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum TransferType {
  Gift = "Gift",
  Exchange = "Exchange",
  Charity = "Charity",
}

export enum TransferMethod {
  InPerson = "InPerson",
  Delivery = "Delivery",
  Both = "Both",
}

export enum ListingStatus {
  Draft = "Draft",
  Active = "Active",
  Reserved = "Reserved",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Moderated = "Moderated",
}

export enum ItemCondition {
  New = "New",
  LikeNew = "LikeNew",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
}

export interface AddPhotoRequest {
  url: string;
  /** @format int32 */
  displayOrder: number;
}

export interface CategoryDetailsDto {
  /** @format uuid */
  id: string;
  name: string;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
  iconUrl?: string | null;
  isActive: boolean;
  /** @format int32 */
  displayOrder: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt?: string | null;
}

export interface CategoryDto {
  /** @format uuid */
  id: string;
  name: string;
  /** @format uuid */
  parentCategoryId?: string | null;
}

export interface CategoryHistoryEntryDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  categoryId: string;
  /** @format uuid */
  changedByUserId: string;
  changeType: string;
  oldValuesJson?: string | null;
  newValuesJson?: string | null;
  /** @format date-time */
  changedAt: string;
}

export interface ChangeStatusRequest {
  status: ListingStatus;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
  iconUrl?: string | null;
  /** @format int32 */
  displayOrder: number;
}

export interface CreateListingDto {
  title: string;
  description: string;
  /** @format uuid */
  categoryId: string;
  condition: ItemCondition;
  transferType: TransferType;
  transferMethod: TransferMethod;
  city: string;
  district?: string | null;
  /** @format double */
  latitude?: number | null;
  /** @format double */
  longitude?: number | null;
  tags?: string[] | null;
}

export interface DonorDto {
  /** @format uuid */
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  /** @format double */
  rating: number;
  /** @format int32 */
  reviewCount: number;
}

export interface ListingDto {
  /** @format uuid */
  id: string;
  title: string;
  description: string;
  category: CategoryDto;
  condition: string;
  transferType: string;
  transferMethod: string;
  status: string;
  location: LocationDto;
  donor: DonorDto;
  photos: ListingPhotoDto[];
  tags: string[];
  /** @format int32 */
  viewCount: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt?: string | null;
}

export interface ListingPhotoDto {
  /** @format uuid */
  id: string;
  url: string;
  /** @format int32 */
  displayOrder: number;
}

export interface ListingPreviewDto {
  /** @format uuid */
  id: string;
  title: string;
  category: CategoryDto;
  condition: string;
  transferType: string;
  status: string;
  city: string;
  thumbnailUrl?: string | null;
  donor?: DonorDto | null;
  /** @format int32 */
  viewCount: number;
  /** @format date-time */
  createdAt: string;
}

export interface ListingPreviewDtoPagedList {
  items: ListingPreviewDto[];
  /** @format int32 */
  totalCount: number;
  /** @format int32 */
  pageNumber: number;
  /** @format int32 */
  pageSize: number;
  /** @format int32 */
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface LocationDto {
  city: string;
  district?: string | null;
  /** @format double */
  latitude?: number | null;
  /** @format double */
  longitude?: number | null;
}

export interface PhotoCreatedDto {
  /** @format uuid */
  photoId: string;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
  iconUrl?: string | null;
  /** @format int32 */
  displayOrder: number;
}

export type CategoriesListData = CategoryDetailsDto[];

export type CategoriesCreateData = any;

export interface CategoriesUpdateParams {
  /** @format uuid */
  id: string;
}

export type CategoriesUpdateData = any;

export interface CategoriesDeleteParams {
  /** @format uuid */
  id: string;
}

export type CategoriesDeleteData = any;

export interface CategoriesHistoryListParams {
  /** @format uuid */
  id: string;
}

export type CategoriesHistoryListData = CategoryHistoryEntryDto[];

export interface ListingsListParams {
  /** @format uuid */
  categoryId?: string;
  condition?: string;
  transferType?: string;
  city?: string;
  searchQuery?: string;
  /**
   * @format int32
   * @default 1
   */
  pageNumber?: number;
  /**
   * @format int32
   * @default 20
   */
  pageSize?: number;
}

export type ListingsListData = ListingPreviewDtoPagedList;

export type ListingsCreateData = any;

export interface ListingsDetailParams {
  /** @format uuid */
  id: string;
}

export type ListingsDetailData = ListingDto;

export interface ListingsUpdateParams {
  /** @format uuid */
  id: string;
}

export type ListingsUpdateData = any;

export interface ListingsDeleteParams {
  /** @format uuid */
  id: string;
}

export type ListingsDeleteData = any;

export interface ListingsMyListParams {
  /**
   * @format int32
   * @default 1
   */
  pageNumber?: number;
  /**
   * @format int32
   * @default 20
   */
  pageSize?: number;
}

export type ListingsMyListData = ListingPreviewDtoPagedList;

export interface ListingsStatusPartialUpdateParams {
  /** @format uuid */
  id: string;
}

export type ListingsStatusPartialUpdateData = any;

export interface ListingsPhotosCreateParams {
  /** @format uuid */
  id: string;
}

export type ListingsPhotosCreateData = PhotoCreatedDto;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ResX Listings API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesList
     * @request GET:/api/categories
     */
    categoriesList: (params: RequestParams = {}) =>
      this.request<CategoriesListData, any>({
        path: `/api/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCreate
     * @request POST:/api/categories
     * @secure
     */
    categoriesCreate: (
      data: CreateCategoryRequest,
      params: RequestParams = {},
    ) =>
      this.request<CategoriesCreateData, ProblemDetails>({
        path: `/api/categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdate
     * @request PUT:/api/categories/{id}
     * @secure
     */
    categoriesUpdate: (
      { id }: CategoriesUpdateParams,
      data: UpdateCategoryRequest,
      params: RequestParams = {},
    ) =>
      this.request<CategoriesUpdateData, ProblemDetails>({
        path: `/api/categories/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDelete
     * @request DELETE:/api/categories/{id}
     * @secure
     */
    categoriesDelete: (
      { id }: CategoriesDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<CategoriesDeleteData, ProblemDetails>({
        path: `/api/categories/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesHistoryList
     * @request GET:/api/categories/{id}/history
     * @secure
     */
    categoriesHistoryList: (
      { id }: CategoriesHistoryListParams,
      params: RequestParams = {},
    ) =>
      this.request<CategoriesHistoryListData, ProblemDetails>({
        path: `/api/categories/${id}/history`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsList
     * @request GET:/api/listings
     */
    listingsList: (query: ListingsListParams, params: RequestParams = {}) =>
      this.request<ListingsListData, any>({
        path: `/api/listings`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsCreate
     * @request POST:/api/listings
     * @secure
     */
    listingsCreate: (data: CreateListingDto, params: RequestParams = {}) =>
      this.request<ListingsCreateData, ProblemDetails>({
        path: `/api/listings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsDetail
     * @request GET:/api/listings/{id}
     */
    listingsDetail: (
      { id }: ListingsDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<ListingsDetailData, ProblemDetails>({
        path: `/api/listings/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsUpdate
     * @request PUT:/api/listings/{id}
     * @secure
     */
    listingsUpdate: (
      { id }: ListingsUpdateParams,
      data: CreateListingDto,
      params: RequestParams = {},
    ) =>
      this.request<ListingsUpdateData, ProblemDetails>({
        path: `/api/listings/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsDelete
     * @request DELETE:/api/listings/{id}
     * @secure
     */
    listingsDelete: (
      { id }: ListingsDeleteParams,
      params: RequestParams = {},
    ) =>
      this.request<ListingsDeleteData, ProblemDetails>({
        path: `/api/listings/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsMyList
     * @request GET:/api/listings/my
     * @secure
     */
    listingsMyList: (query: ListingsMyListParams, params: RequestParams = {}) =>
      this.request<ListingsMyListData, ProblemDetails>({
        path: `/api/listings/my`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsStatusPartialUpdate
     * @request PATCH:/api/listings/{id}/status
     * @secure
     */
    listingsStatusPartialUpdate: (
      { id }: ListingsStatusPartialUpdateParams,
      data: ChangeStatusRequest,
      params: RequestParams = {},
    ) =>
      this.request<ListingsStatusPartialUpdateData, ProblemDetails>({
        path: `/api/listings/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Listings
     * @name ListingsPhotosCreate
     * @request POST:/api/listings/{id}/photos
     * @secure
     */
    listingsPhotosCreate: (
      { id }: ListingsPhotosCreateParams,
      data: AddPhotoRequest,
      params: RequestParams = {},
    ) =>
      this.request<ListingsPhotosCreateData, ProblemDetails>({
        path: `/api/listings/${id}/photos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
