import queryString from 'query-string';

import useHttpClient from '@/components/hooks/useHttpClient';
import AppConfig from '@/configs/AppConfig';
import {
  PayloadPageOptions,
  RestaurantDetailResponse,
  CentertItem,
  CenterResponse,
  VideosUploadedResponse,
} from '@/types';

type ResultCenterService = {
  getAll: (pageOptions?: PayloadPageOptions) => Promise<CenterResponse>;
  getDetail: (id: string, pageOptions?: PayloadPageOptions) => Promise<RestaurantDetailResponse>;
  uploadVideo: (file: File, id: string) => Promise<any>;
  createCenters: () => Promise<CentertItem>;
  getVideosUploaded: (
    id: string,
    pageOptions?: PayloadPageOptions,
  ) => Promise<VideosUploadedResponse>;
  createProject: (id: string, body: any) => Promise<any>;
  getMemberList: (pageOptions?: PayloadPageOptions) => Promise<CenterResponse>;
  createNewMember: (body: any) => Promise<any>;
};

const useCenterService = (): ResultCenterService => {
  const httpClient = useHttpClient();

  const getAll = (pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<CenterResponse>(AppConfig.CENTER.GET_ALL(queryParams));
  };

  const getMemberList = (pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<any>(AppConfig.CENTER.GET_MEMBER_LIST(queryParams));
  };

  const getDetail = (id: string, pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<RestaurantDetailResponse>(AppConfig.CENTER.GET_DETAIL(id, queryParams));
  };

  const uploadVideo = (file: File, id: string) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpClient.post(AppConfig.CENTER.UPLOAD_VIDEO(id), formData);
  };

  const createCenters = () => {
    return httpClient.post<CentertItem>(AppConfig.CENTER.CREATES(), {});
  };

  const createProject = (id: string, body: any) => {
    return httpClient.post<any>(AppConfig.CENTER.CREATES_PROJECT(id), body);
  };

  const createNewMember = (body: any) => {
    return httpClient.post<any>(AppConfig.CENTER.CREATES_MEMBER(), body);
  };

  const getVideosUploaded = (id: string, pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<VideosUploadedResponse>(
      AppConfig.CENTER.GET_VIEDEOS_UPLOADED(id, queryParams),
    );
  };

  return {
    getAll,
    getDetail,
    uploadVideo,
    createCenters,
    getVideosUploaded,
    createProject,
    getMemberList,
    createNewMember,
  };
};

export default useCenterService;
