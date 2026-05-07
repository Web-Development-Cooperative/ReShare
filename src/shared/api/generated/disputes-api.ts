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

export interface AddEvidenceRequest {
  description: string;
  fileUrls?: string[] | null;
}

export interface DisputeCreatedDto {
  /** @format uuid */
  disputeId: string;
}

export interface DisputeDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  transactionId: string;
  /** @format uuid */
  initiatorId: string;
  /** @format uuid */
  respondentId: string;
  reason: string;
  status: string;
  resolution?: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  resolvedAt?: string | null;
  evidences: EvidenceDto[];
}

export interface EvidenceCreatedDto {
  /** @format uuid */
  evidenceId: string;
}

export interface EvidenceDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  submittedBy: string;
  description: string;
  fileUrls: string[];
  /** @format date-time */
  submittedAt: string;
}

export interface OpenDisputeRequest {
  /** @format uuid */
  transactionId: string;
  /** @format uuid */
  respondentId: string;
  reason: string;
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

export interface ResolveDisputeRequest {
  resolution: string;
}

export interface DisputesListParams {
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

export type DisputesListData = any;

export type DisputesCreateData = DisputeCreatedDto;

export interface DisputesDetailParams {
  /** @format uuid */
  id: string;
}

export type DisputesDetailData = DisputeDto;

export interface DisputesOpenListParams {
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

export type DisputesOpenListData = any;

export interface DisputesEvidenceCreateParams {
  /** @format uuid */
  id: string;
}

export type DisputesEvidenceCreateData = EvidenceCreatedDto;

export interface DisputesResolveCreateParams {
  /** @format uuid */
  id: string;
}

export type DisputesResolveCreateData = any;

export interface DisputesCloseCreateParams {
  /** @format uuid */
  id: string;
}

export type DisputesCloseCreateData = any;

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
 * @title ResX Disputes API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Disputes
     * @name DisputesList
     * @request GET:/api/disputes
     * @secure
     */
    disputesList: (query: DisputesListParams, params: RequestParams = {}) =>
      this.request<DisputesListData, ProblemDetails>({
        path: `/api/disputes`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disputes
     * @name DisputesCreate
     * @request POST:/api/disputes
     * @secure
     */
    disputesCreate: (data: OpenDisputeRequest, params: RequestParams = {}) =>
      this.request<DisputesCreateData, ProblemDetails>({
        path: `/api/disputes`,
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
     * @tags Disputes
     * @name DisputesDetail
     * @request GET:/api/disputes/{id}
     * @secure
     */
    disputesDetail: (
      { id }: DisputesDetailParams,
      params: RequestParams = {},
    ) =>
      this.request<DisputesDetailData, ProblemDetails>({
        path: `/api/disputes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disputes
     * @name DisputesOpenList
     * @request GET:/api/disputes/open
     * @secure
     */
    disputesOpenList: (
      query: DisputesOpenListParams,
      params: RequestParams = {},
    ) =>
      this.request<DisputesOpenListData, ProblemDetails>({
        path: `/api/disputes/open`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disputes
     * @name DisputesEvidenceCreate
     * @request POST:/api/disputes/{id}/evidence
     * @secure
     */
    disputesEvidenceCreate: (
      { id }: DisputesEvidenceCreateParams,
      data: AddEvidenceRequest,
      params: RequestParams = {},
    ) =>
      this.request<DisputesEvidenceCreateData, ProblemDetails>({
        path: `/api/disputes/${id}/evidence`,
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
     * @tags Disputes
     * @name DisputesResolveCreate
     * @request POST:/api/disputes/{id}/resolve
     * @secure
     */
    disputesResolveCreate: (
      { id }: DisputesResolveCreateParams,
      data: ResolveDisputeRequest,
      params: RequestParams = {},
    ) =>
      this.request<DisputesResolveCreateData, ProblemDetails>({
        path: `/api/disputes/${id}/resolve`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disputes
     * @name DisputesCloseCreate
     * @request POST:/api/disputes/{id}/close
     * @secure
     */
    disputesCloseCreate: (
      { id }: DisputesCloseCreateParams,
      params: RequestParams = {},
    ) =>
      this.request<DisputesCloseCreateData, ProblemDetails>({
        path: `/api/disputes/${id}/close`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
