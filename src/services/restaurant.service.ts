import queryString from 'query-string';

import useHttpClient from '@/components/hooks/useHttpClient';
import AppConfig from '@/configs/AppConfig';
import { PayloadPageOptions, RestaurantDetailResponse, RestaurantResponse } from '@/types';

type ResultLoginService = {
  getAll: (pageOptions?: PayloadPageOptions) => Promise<RestaurantResponse>;
  getDetail: (id: string) => Promise<RestaurantDetailResponse>;
  uploadVideo: (file: File, id: string) => Promise<any>;
};

const useRestaurantService = (): ResultLoginService => {
  const httpClient = useHttpClient();

  const getAll = (pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<RestaurantResponse>(AppConfig.RESTAURANT.GET_ALL(queryParams));
  };

  const getDetail = (id: string) => {
    return httpClient.get<RestaurantDetailResponse>(AppConfig.RESTAURANT.GET_DETAIL(id));
  };

  const uploadVideo = (file: File, id: string) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpClient.post(AppConfig.RESTAURANT.UPLOAD_VIDEO(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    getAll,
    getDetail,
    uploadVideo,
  };
};

export default useRestaurantService;
