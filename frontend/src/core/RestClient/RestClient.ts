export interface RequestHeaders {
  [key: string]: string;
}

export interface RequestParameters {
  [key: string]: string;
}

export type responseType = 'json' | 'text' | 'blob' | 'arraybuffer';

export interface RequestOptions {
  headers?: RequestHeaders;
  params?: RequestParameters;
  responseType?: responseType;
  withCredentials?: boolean;
  timeout?: number;
}

export interface RestClient {
  get(url: string, options?: RequestOptions): Promise<Response>;
  put<T>(url: string, body: T, options?: RequestOptions): Promise<Response>;
  delete(url: string, options?: RequestOptions): Promise<Response>;
}
