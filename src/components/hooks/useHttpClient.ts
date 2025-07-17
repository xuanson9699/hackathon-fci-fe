import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useTranslation } from 'react-i18next';

import { logOut, refreshToken } from '@/services/login.service';
import useNotiStore from '@/store/noti.slice';

import axiosInstance from '../utils/axiosInstance';

type ExtendedAxiosConfig = AxiosRequestConfig & {
  hideNoti?: boolean;
};

type ResultHttpClient = {
  get: <T>(
    url: string,
    headers?: Record<string, string>,
    config?: ExtendedAxiosConfig,
  ) => Promise<T>;
  post: <T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>,
    config?: ExtendedAxiosConfig,
  ) => Promise<T>;
  put: <T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>,
    config?: ExtendedAxiosConfig,
  ) => Promise<T>;
  patch: <T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>,
    config?: ExtendedAxiosConfig,
  ) => Promise<T>;
  delete: <T>(
    url: string,
    headers?: Record<string, string>,
    config?: ExtendedAxiosConfig,
  ) => Promise<T>;
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const useHttpClient = (): ResultHttpClient => {
  const { t } = useTranslation();
  const { setNoti } = useNotiStore();

  const handleError = async (error: any) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshToken();
          if (!newAccessToken) {
            logOut();
            return;
          }
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          onRefreshed(newAccessToken);
          return axios(originalRequest);
        } catch (refreshError) {
          logOut();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    } else {
      console.error(error);
      setNoti({
        type: 'error',
        message: error?.response?.data?.status || t('common.genericErrorMessages'),
      });
    }

    return Promise.reject(
      error instanceof Error
        ? error
        : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
    );
  };

  const request = async <T>(
    method: AxiosRequestConfig['method'],
    url: string,
    data: unknown,
    headers: Record<string, string> = {},
    config?: ExtendedAxiosConfig,
  ): Promise<T> => {
    try {
      const response = await axiosInstance.request<T>({
        url,
        method,
        data,
        headers: data instanceof FormData ? undefined : headers,
        ...(config ?? {}),
      });

      if (!config?.hideNoti) {
        if (method === 'POST') {
          setNoti({ type: 'success', message: t('common.createSuccessfully') });
        } else if (method === 'PUT') {
          setNoti({ type: 'success', message: t('common.updateSuccessfully') });
        } else if (method === 'DELETE') {
          setNoti({ type: 'success', message: t('common.deleteSuccessfully') });
        }
      }

      return response.data;
    } catch (error) {
      await handleError(error);
      throw error;
    }
  };

  return {
    get: <T>(url: string, headers?: Record<string, string>, config?: ExtendedAxiosConfig) =>
      request<T>('GET', url, undefined, headers, config),

    post: <T>(
      url: string,
      data: unknown,
      headers?: Record<string, string>,
      config?: AxiosRequestConfig,
    ) => request<T>('POST', url, data, headers, config),

    put: <T>(
      url: string,
      data: unknown,
      headers?: Record<string, string>,
      config?: AxiosRequestConfig,
    ) => request<T>('PUT', url, data, headers, config),

    patch: <T>(
      url: string,
      data: unknown,
      headers?: Record<string, string>,
      config?: AxiosRequestConfig,
    ) => request<T>('PATCH', url, data, headers, config),

    delete: <T>(url: string, headers?: Record<string, string>, config?: AxiosRequestConfig) =>
      request<T>('DELETE', url, undefined, headers, config),
  };
};

export default useHttpClient;
