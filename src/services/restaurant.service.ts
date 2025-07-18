import queryString from 'query-string';

import useHttpClient from '@/components/hooks/useHttpClient';
import AppConfig from '@/configs/AppConfig';
import {
  PayloadPageOptions,
  RestaurantDetailResponse,
  RestaurantItem,
  RestaurantResponse,
  VideosUploadedResponse,
} from '@/types';

type ResultLoginService = {
  getAll: (pageOptions?: PayloadPageOptions) => Promise<RestaurantResponse>;
  getDetail: (id: string, pageOptions?: PayloadPageOptions) => Promise<RestaurantDetailResponse>;
  uploadVideo: (file: File, id: string) => Promise<any>;
  createRestaurant: (name: string) => Promise<RestaurantItem>;
  getVideosUploaded: (
    id: string,
    pageOptions?: PayloadPageOptions,
  ) => Promise<VideosUploadedResponse>;
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

  const getDetail = (id: string, pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<RestaurantDetailResponse>(
      AppConfig.RESTAURANT.GET_DETAIL(id, queryParams),
    );
  };

  const uploadVideo = (file: File, id: string) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpClient.post(AppConfig.RESTAURANT.UPLOAD_VIDEO(id), formData);
  };

  const createRestaurant = (name: string) => {
    const formData = new FormData();
    formData.append('name', name);
    return httpClient.post<RestaurantItem>(AppConfig.RESTAURANT.CREATE_NEW(), formData);
  };

  const getVideosUploaded = (id: string, pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<VideosUploadedResponse>(
      AppConfig.RESTAURANT.GET_VIEDEOS_UPLOADED(id, queryParams),
    );
  };

  return {
    getAll,
    getDetail,
    uploadVideo,
    createRestaurant,
    getVideosUploaded,
  };
};

export default useRestaurantService;
