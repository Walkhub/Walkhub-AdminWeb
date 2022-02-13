import axios, { AxiosError } from "axios";
import cookies from "react-cookies";
import { setToken, removeToken, getToken } from "../function/tokenManager";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async error => {
    const { config, response } = error;
    if (response.status === 401 && getToken().refrashToken) {
      try {
        const res = await axios({
          method: "put",
          url: "",
          data: {
            refresh_token: getToken().refrashToken,
          },
        });
        const { access_token, refresh_token } = res.data;

        setToken(access_token, refresh_token);
        config.headers.Authorization = `Bearer ${access_token}`;

        return axios(config);
      } catch (err: any) {
        if (err.response.status === 401) {
          alert("다시 로그인해주세요.");
          window.location.href = "/login";
          removeToken();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
