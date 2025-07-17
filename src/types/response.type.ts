type LoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};

type PaginationResponse<T> = {
  code: string;
  message: string;
  data: T[];
  metadata: ResponsePageOptions;
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

type PayloadPageOptions = { [key: string]: number | string | undefined };

type RestaurantItem = {
  restaurant_id: string;
  name: string;
  created_by: string;
  created_at: string;
  number_video?: number;
};

type RestaurantResponse = PaginationResponse<RestaurantItem>;

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
  videos: RestaurantVideo[];
};

export type {
  LoginResponse,
  PaginationResponse,
  RestaurantResponse,
  RestaurantItem,
  ResponseData,
  PayloadPageOptions,
  RestaurantDetailResponse,
  RestaurantVideo,
  RestaurantEventItem,
  RestaurantEvenSubItem,
};
