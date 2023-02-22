import { Token } from '../Token';
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
    return this.fetch(url, 'GET', undefined, options);
  }

  async put<T>(
    url: string,
    body: T,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, 'PUT', body, options);
  }

  async post(
    url: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, 'POST', body, options);
  }

  async delete(
    url: string,
    options?: RequestOptions | undefined
  ): Promise<Response> {
    return this.fetch(url, 'DELETE', undefined, options);
  }

  private async fetch<T>(
    url: string,
    method: string,
    body?: T,
    options?: RequestOptions | undefined
  ): Promise<Response> {
    const res = await fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
      },
      method,
      body: body && JSON.stringify(body),
    });

    if (res.status === 401) {
      Token.delete();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const body = await res.json();

        if (body?.message) {
          throw new Error(body.message);
        }
      }

      throw new Error('An error occurred');
    }

    return res;
  }
}
