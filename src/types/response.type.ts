type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

type PaginationResponse<T> = {
  code: string;
  message: string;
  data: T[];
  meta: ResponsePageOptions;
};

type ResponsePageOptions = {
  page: number;
  per_page: number;
  total?: number;
  [key: string]: number | string | undefined;
};

type ResponseData<T> = {
  data: T;
  error: string[];
  status: boolean;
  statusCode: number;
};

type PayloadPageOptions = { [key: string]: number | string | undefined | null };

type CentertItem = {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  project_number: number;
  member_number: number;

  latest_uploaded: string;
};

type CenterResponse = PaginationResponse<CentertItem>;

type RestaurantVideo = {
  video_id: string;
  camera_id: string;
  filename: string;
  recorded_date: string;
  start_time: string;
  end_time: string;
  uploaded_at: string;
};

type RestaurantEvenSubItem = {
  person_external_id: string;
  event_start: string;
  event_end: string;
  image_start: string;
  image_end: string;
  duration_seconds: number;
};

type RestaurantEventItem = RestaurantEvenSubItem & {
  sub_events: RestaurantEvenSubItem[];
};

type RestaurantDetailResponse = {
  restaurant_id: string;
  name: string;
  created_by: string;
  created_at: string;
  events: RestaurantEventItem[];
  meta: ResponsePageOptions;
};

type Video = {
  id: string;
  camera_id: string;
  filename: string;
  recorded_date: string;
  start_time: string;
  end_time: string;
  uploaded_at: string;
  status: string;
};

type VideosUploadedResponse = {
  restaurant_id: string;
  name: string;
  videos: Video[];
  meta: ResponsePageOptions;
};

export type {
  LoginResponse,
  PaginationResponse,
  CenterResponse,
  CentertItem,
  ResponseData,
  PayloadPageOptions,
  RestaurantDetailResponse,
  RestaurantVideo,
  RestaurantEventItem,
  RestaurantEvenSubItem,
  VideosUploadedResponse,
  Video,
};
