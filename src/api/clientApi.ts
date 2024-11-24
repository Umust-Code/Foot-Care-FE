import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { BASE_URL, PUBLIC_PATHS, API_REFRESH } from './constant';

class Api {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

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
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            try {
              const token = await new Promise<string>((resolve) => {
                this.refreshSubscribers.push(resolve);
              });
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            } catch (err) {
              return Promise.reject(err);
            }
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token');

            const response = await axios.post(
              `${BASE_URL}${API_REFRESH}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              },
            );

            const { accessToken: newAccessToken } = response.data;
            localStorage.setItem('accessToken', newAccessToken);

            this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
            this.refreshSubscribers = [];

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            if (window.location.pathname !== '/signin') {
              // window.location.href = '/signin';
              console.log('로그인으로 리다이렉트 할 예정');
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.response?.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          if (window.location.pathname !== '/signin') {
            // window.location.href = '/signin';
            console.log('로그인으로 리다이렉트 할 예정');
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
