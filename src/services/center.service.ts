import queryString from 'query-string';

import useHttpClient from '@/components/hooks/useHttpClient';
import AppConfig from '@/configs/AppConfig';
import { CenterResponse, CentertItem, PayloadPageOptions, RestaurantDetailResponse } from '@/types';

type ResultCenterService = {
  getAll: (pageOptions?: PayloadPageOptions) => Promise<CenterResponse>;
  getDetail: (id: string, pageOptions?: PayloadPageOptions) => Promise<any>;
  createCenters: () => Promise<CentertItem>;
  createProject: (id: string, body: any) => Promise<any>;
  getMemberList: (pageOptions?: PayloadPageOptions) => Promise<CenterResponse>;
  createNewMember: (body: any) => Promise<any>;

  getReferenceByProject: (id: string, pageOptions?: PayloadPageOptions) => Promise<any>;
  createReference: (projectId: string, body: any) => Promise<any>;

  getUserInfo: (payload: PayloadPageOptions) => Promise<any>;
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

  const getReferenceByProject = (pageId: string, pageOptions?: PayloadPageOptions) => {
    let queryParams = '';
    if (pageOptions) {
      queryParams = queryString.stringify(pageOptions);
    }
    return httpClient.get<RestaurantDetailResponse>(
      AppConfig.CENTER.GET_REFERENCE_BY_PROJECT(pageId, queryParams),
    );
  };

  const createCenters = () => {
    return httpClient.post<CentertItem>(AppConfig.CENTER.CREATES(), {});
  };

  const createProject = (id: string, body: any) => {
    return httpClient.post<any>(AppConfig.CENTER.CREATES_PROJECT(id), body);
  };

  const createReference = (projectId: string, body: any) => {
    return httpClient.post<any>(AppConfig.CENTER.CREATES_REFERENCE(projectId), body);
  };

  const createNewMember = (body: any) => {
    return httpClient.post<any>(AppConfig.CENTER.CREATES_MEMBER(), body);
  };

  const getUserInfo = (payload?: PayloadPageOptions) => {
    let queryParams = '';
    if (payload) {
      queryParams = queryString.stringify(payload);
    }
    return httpClient.get<any>(AppConfig.CENTER.GET_USER_INFO(queryParams));
  };

  return {
    getAll,
    getDetail,
    createCenters,
    createProject,
    getMemberList,
    createNewMember,
    getReferenceByProject,
    createReference,
    getUserInfo,
  };
};

export default useCenterService;
