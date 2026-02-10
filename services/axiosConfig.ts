import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  message?: string;
}

const API_BASE_URL = 'https://api-aumbram-new.estpl.net:8992/api/v1';

let isLoggingOut = false;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
  maxBodyLength: Infinity,
  headers: {
    Accept: 'application/json',
  },
});

// --------------------
// Request Interceptor
// --------------------
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // const token = await LocalStorage.getItem('token');

    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    console.log('API Error:', status, message);

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      //   try {
      //     await LocalStorage.removeItem('token');

      //     const authStore = useUserStore.getState();
      //     authStore.setIsLoggedIn(false);
      //     authStore.clearUserData();
      //     authStore.clearVendorData();

      //     showGlobalSnackbar('Session expired. Please login again.', {
      //       position: 'bottom',
      //       type: 'error',
      //     });
      //   } finally {
      //     isLoggingOut = false;
      //   }
    }

    return Promise.reject(error);
  }
);
