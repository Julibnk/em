import { RequestHeaders, RequestOptions, RestClient } from './RestClient';

export class FetchRestClient implements RestClient {
  private headers: RequestHeaders;
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    this.baseUrl = baseUrl || import.meta.env.VITE_BACKEND_URL || '';
  }

  async get(url: string, options?: RequestOptions): Promise<Response> {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
      },
    });
  }

  async put<T>(
    url: string,
    body: T,
    options?: RequestOptions
  ): Promise<Response> {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
      },
      body: JSON.stringify(body),
      method: 'PUT',
    });
  }

  async post<T>(
    url: string,
    body: T,
    options?: RequestOptions
  ): Promise<Response> {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
  }

  async delete(
    url: string,
    options?: RequestOptions | undefined
  ): Promise<Response> {
    return fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
      },
      method: 'DELETE',
    });
  }
}
