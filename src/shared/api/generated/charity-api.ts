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

export interface CharityRequestDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  organizationId: string;
  title: string;
  description: string;
  status: string;
  requestedItems: RequestedItemDto[];
  /** @format date-time */
  deadlineDate?: string | null;
  /** @format date-time */
  createdAt: string;
}

export interface CharityRequestDtoPagedList {
  items: CharityRequestDto[];
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

export interface CreateCharityRequestDto {
  title: string;
  description: string;
  /** @format date-time */
  deadlineDate?: string | null;
  items: CreateRequestedItemDto[];
}

export interface CreateOrganizationDto {
  name: string;
  description: string;
  legalDocumentUrl?: string | null;
}

export interface CreateRequestedItemDto {
  /** @format uuid */
  categoryId: string;
  categoryName: string;
  /** @format int32 */
  quantityNeeded: number;
  condition: string;
}

export interface OrganizationCreatedDto {
  /** @format uuid */
  orgId: string;
}

export interface OrganizationDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  userId: string;
  name: string;
  description: string;
  verificationStatus: string;
  legalDocumentUrl?: string | null;
  /** @format date-time */
  createdAt: string;
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

export interface RequestedItemDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  categoryId: string;
  categoryName: string;
  /** @format int32 */
  quantityNeeded: number;
  /** @format int32 */
  quantityReceived: number;
  condition: string;
}

export interface CharityRequestsListParams {
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

export type CharityRequestsListData = CharityRequestDtoPagedList;

export type CharityRequestsCreateData = any;

export interface CharityRequestsDetailParams {
  /** @format uuid */
  id: string;
}

export type CharityRequestsDetailData = CharityRequestDto;

export interface CharityOrganizationsDetailParams {
  /** @format uuid */
  id: string;
}

export type CharityOrganizationsDetailData = OrganizationDto;

export type CharityOrganizationsCreateData = OrganizationCreatedDto;

export interface CharityOrganizationsVerifyUpdateParams {
  /** @format uuid */
  id: string;
}

export type CharityOrganizationsVerifyUpdateData = any;

export interface CharityOrganizationsRejectUpdateParams {
  /** @format uuid */
  id: string;
}

export type CharityOrganizationsRejectUpdateData = any;

export interface CharityRequestsCancelCreateParams {
  /** @format uuid */
  id: string;
}

export type CharityRequestsCancelCreateData = any;

export interface CharityRequestsCompleteCreateParams {
  /** @format uuid */
  id: string;
}

export type CharityRequestsCompleteCreateData = any;

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
 * @title ResX Charity API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Charity
     * @name CharityRequestsList
     * @request GET:/api/charity/requests
     */
    charityRequestsList: (
      query: CharityRequestsListParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityRequestsListData, any>({
        path: `/api/charity/requests`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityRequestsCreate
     * @request POST:/api/charity/requests
     * @secure
     */
    charityRequestsCreate: (
      data: CreateCharityRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<CharityRequestsCreateData, ProblemDetails>({
        path: `/api/charity/requests`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityRequestsDetail
     * @request GET:/api/charity/requests/{id}
     */
    charityRequestsDetail: (
      { id }: CharityRequestsDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityRequestsDetailData, ProblemDetails>({
        path: `/api/charity/requests/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityOrganizationsDetail
     * @request GET:/api/charity/organizations/{id}
     */
    charityOrganizationsDetail: (
      { id }: CharityOrganizationsDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityOrganizationsDetailData, ProblemDetails>({
        path: `/api/charity/organizations/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityOrganizationsCreate
     * @request POST:/api/charity/organizations
     * @secure
     */
    charityOrganizationsCreate: (
      data: CreateOrganizationDto,
      params: RequestParams = {},
    ) =>
      this.request<CharityOrganizationsCreateData, ProblemDetails>({
        path: `/api/charity/organizations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityOrganizationsVerifyUpdate
     * @request PUT:/api/charity/organizations/{id}/verify
     * @secure
     */
    charityOrganizationsVerifyUpdate: (
      { id }: CharityOrganizationsVerifyUpdateParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityOrganizationsVerifyUpdateData, ProblemDetails>({
        path: `/api/charity/organizations/${id}/verify`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityOrganizationsRejectUpdate
     * @request PUT:/api/charity/organizations/{id}/reject
     * @secure
     */
    charityOrganizationsRejectUpdate: (
      { id }: CharityOrganizationsRejectUpdateParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityOrganizationsRejectUpdateData, ProblemDetails>({
        path: `/api/charity/organizations/${id}/reject`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityRequestsCancelCreate
     * @request POST:/api/charity/requests/{id}/cancel
     * @secure
     */
    charityRequestsCancelCreate: (
      { id }: CharityRequestsCancelCreateParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityRequestsCancelCreateData, ProblemDetails>({
        path: `/api/charity/requests/${id}/cancel`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charity
     * @name CharityRequestsCompleteCreate
     * @request POST:/api/charity/requests/{id}/complete
     * @secure
     */
    charityRequestsCompleteCreate: (
      { id }: CharityRequestsCompleteCreateParams,
      params: RequestParams = {},
    ) =>
      this.request<CharityRequestsCompleteCreateData, ProblemDetails>({
        path: `/api/charity/requests/${id}/complete`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
