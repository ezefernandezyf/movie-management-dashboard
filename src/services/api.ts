import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export class ApiError extends Error {
  status?: number;
  details?: unknown;
  original?: unknown;

  constructor(message: string, opts?: { status?: number; details?: unknown; original?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = opts?.status;
    this.details = opts?.details;
    this.original = opts?.original;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

let axiosInstance: AxiosInstance | undefined;

export const initApi = (baseURL = BASE_URL) => {
  axiosInstance = axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || 'Request error';
        if (import.meta.env.DEV) {
          console.debug('[API error]', { status, message, data: error.response?.data });
        }
        return Promise.reject(
          new ApiError(message, { status, details: error.response?.data, original: error }),
        );
      }
      return Promise.reject(new ApiError('Unexpected error', { original: error }));
    },
  );
};

export const resetApi = () => {
  axiosInstance = undefined;
};

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  if (!axiosInstance) initApi(BASE_URL);
  try {
    const res = await axiosInstance!.request<T>(config);
    return res.data as T;
  } catch (err) {
    throw err;
  }
};

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ method: 'GET', url, ...config });

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ method: 'POST', url, data, ...config });

export const put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ method: 'PUT', url, data, ...config });

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ method: 'DELETE', url, ...config });
