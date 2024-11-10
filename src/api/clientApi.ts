import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { BASE_URL, PUBLIC_PATHS } from './constant';

class Api {
  private client: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.client = axios.create(config);

    this.client.interceptors.request.use(
      (config) => {
        const isPublicPath = PUBLIC_PATHS.some((path) => config.url?.startsWith(path));

        if (!isPublicPath) {
          const token = localStorage.getItem('accessToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('accessToken');
          if (window.location.pathname !== '/signin') {
            window.location.href = '/signin';
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public get<T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(path, config);
  }

  public post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(path, data, config);
  }

  public put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(path, data, config);
  }

  public delete<T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(path, config);
  }
}

const clientApi = new Api({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 60000,
});

export { clientApi };
