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

export interface ConversationCreatedDto {
  /** @format uuid */
  conversationId: string;
}

export interface ConversationDto {
  /** @format uuid */
  id: string;
  participants: ParticipantSummaryDto[];
  counterparty?: ParticipantSummaryDto | null;
  /** @format uuid */
  listingId?: string | null;
  listing?: ListingSummaryDto | null;
  lastMessage?: MessageDto | null;
  /** @format int32 */
  unreadCount: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  lastMessageAt?: string | null;
}

export interface ConversationDtoPagedList {
  items: ConversationDto[];
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

export interface CreateConversationDto {
  /** @format uuid */
  recipientId: string;
  /** @format uuid */
  listingId?: string | null;
  initialMessage?: string | null;
}

export interface ListingSummaryDto {
  /** @format uuid */
  id: string;
  title: string;
}

export interface MessageDto {
  /** @format uuid */
  id: string;
  /** @format uuid */
  conversationId: string;
  /** @format uuid */
  senderId: string;
  content: string;
  /** @format date-time */
  sentAt: string;
  isRead: boolean;
}

export interface MessageDtoPagedList {
  items: MessageDto[];
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

export interface ParticipantSummaryDto {
  /** @format uuid */
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
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

export interface SendMessageDto {
  content: string;
}

export interface MessagingConversationsListParams {
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

export type MessagingConversationsListData = ConversationDtoPagedList;

export type MessagingConversationsCreateData = ConversationCreatedDto;

export interface MessagingConversationsMessagesListParams {
  /**
   * @format int32
   * @default 1
   */
  pageNumber?: number;
  /**
   * @format int32
   * @default 50
   */
  pageSize?: number;
  /** @format uuid */
  conversationId: string;
}

export type MessagingConversationsMessagesListData = MessageDtoPagedList;

export interface MessagingConversationsMessagesCreateParams {
  /** @format uuid */
  conversationId: string;
}

export type MessagingConversationsMessagesCreateData = MessageDto;

export interface MessagingConversationsReadCreateParams {
  /** @format uuid */
  conversationId: string;
}

export type MessagingConversationsReadCreateData = any;

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
 * @title ResX Messaging API
 * @version v1
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Messaging
     * @name MessagingConversationsList
     * @request GET:/api/messaging/conversations
     * @secure
     */
    messagingConversationsList: (
      query: MessagingConversationsListParams,
      params: RequestParams = {},
    ) =>
      this.request<MessagingConversationsListData, ProblemDetails>({
        path: `/api/messaging/conversations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Messaging
     * @name MessagingConversationsCreate
     * @request POST:/api/messaging/conversations
     * @secure
     */
    messagingConversationsCreate: (
      data: CreateConversationDto,
      params: RequestParams = {},
    ) =>
      this.request<MessagingConversationsCreateData, ProblemDetails>({
        path: `/api/messaging/conversations`,
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
     * @tags Messaging
     * @name MessagingConversationsMessagesList
     * @request GET:/api/messaging/conversations/{conversationId}/messages
     * @secure
     */
    messagingConversationsMessagesList: (
      { conversationId, ...query }: MessagingConversationsMessagesListParams,
      params: RequestParams = {},
    ) =>
      this.request<MessagingConversationsMessagesListData, ProblemDetails>({
        path: `/api/messaging/conversations/${conversationId}/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Messaging
     * @name MessagingConversationsMessagesCreate
     * @request POST:/api/messaging/conversations/{conversationId}/messages
     * @secure
     */
    messagingConversationsMessagesCreate: (
      { conversationId }: MessagingConversationsMessagesCreateParams,
      data: SendMessageDto,
      params: RequestParams = {},
    ) =>
      this.request<MessagingConversationsMessagesCreateData, ProblemDetails>({
        path: `/api/messaging/conversations/${conversationId}/messages`,
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
     * @tags Messaging
     * @name MessagingConversationsReadCreate
     * @request POST:/api/messaging/conversations/{conversationId}/read
     * @secure
     */
    messagingConversationsReadCreate: (
      { conversationId }: MessagingConversationsReadCreateParams,
      params: RequestParams = {},
    ) =>
      this.request<MessagingConversationsReadCreateData, ProblemDetails>({
        path: `/api/messaging/conversations/${conversationId}/read`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
