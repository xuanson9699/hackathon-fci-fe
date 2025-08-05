export default class AppConfig {
  public static readonly LANG_TOKEN = 'lang';
  public static readonly BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
  public static readonly BASE_SOCKET_URL = import.meta.env.VITE_APP_BASE_SOCKET_URL;
  public static readonly ID_TOKEN = 'id_token';
  public static readonly APP_KEYCLOAK_BASE_URL = import.meta.env.VITE_APP_KEYCLOAK_BASE_URL;
  public static readonly APP_KEYCLOAK_REALM_NAME = import.meta.env.VITE_APP_KEYCLOAK_REALM_NAME;
  public static readonly APP_AUTHORIZATION_CLIENT_ID = import.meta.env
    .VITE_APP_KEYCLOAK_AUTHORIZATION_CLIENT_ID;

  public static readonly CENTER = {
    GET_ALL: (param: string) => `centers?${param}`,
    CREATES: () => 'centers',
    GET_DETAIL: (id: string, queryParams: string) => `centers/${id}/projects?${queryParams}`,
    UPLOAD_VIDEO: (id: string) => `centers/${id}/videos`,
    CREATE_NEW: () => 'centers',
    GET_VIEDEOS_UPLOADED: (id: string, queryParams: string) =>
      `centers/${id}/videos?${queryParams}`,
    CREATES_PROJECT: (id: string) => `centers/${id}/projects`,
    GET_MEMBER_LIST: (param: string) => `members?${param}`,
    CREATES_MEMBER: () => 'members',
  };

  // User
  public static readonly AUT_LOGIN = {
    LOGIN: () => 'auth/login',
  };
}
