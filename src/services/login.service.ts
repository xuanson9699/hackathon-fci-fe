import axios from 'axios';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/components/constants';
import useHttpClient from '@/components/hooks/useHttpClient';
import AppConfig from '@/configs/AppConfig';
import { LoginPayload, LoginResponse } from '@/types';

type ResultLoginService = {
  login: (payload: LoginPayload) => Promise<LoginResponse>;
};

export const logOut = async () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);

  window.location.href = '/login';
};

export const refreshToken = async (): Promise<string> => {
  try {
    const url = '';
    const data = new URLSearchParams({
      refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
    });

    const response = await axios.post<{
      access_token: string;
      refresh_token: string;
    }>(url, data);

    const { access_token, refresh_token } = response.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

    return access_token;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
};
const useLoginService = (): ResultLoginService => {
  const httpClient = useHttpClient();

  const login = (payload: LoginPayload) => {
    return httpClient.post<LoginResponse>(
      AppConfig.AUT_LOGIN.LOGIN(),
      payload,
      {},
      { hideNoti: true },
    );
  };

  return {
    login,
  };
};

export default useLoginService;
