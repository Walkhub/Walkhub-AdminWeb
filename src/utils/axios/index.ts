import axios, { AxiosError } from "axios";
import ToastError from "../function/errorMessage";
import { setToken, removeToken, getToken } from "../function/tokenManager";
import router from "next/router";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async function (config) {
    const accessToken = await getToken().accessToken;
    accessToken
      ? (config.headers = {
          Authorization: `Bearer ${accessToken}`,
        })
      : null;
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
    if (axios.isAxiosError(error) && error.response) {
      const { config, response } = error;
      if (response.data.status === 401 && getToken().refreshToken) {
        try {
          const res = await axios({
            method: "patch",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/token`,
            headers: {
              "Refresh-Token": `Bearer ${getToken().refreshToken}`,
            },
          });

          const { access_token, refresh_token } = res.data;

          setToken(access_token, refresh_token);
          if (config.headers)
            config.headers.Authorization = `Bearer ${access_token}`;
          return axios(config);
        } catch (err: any) {
          if (
            err.response.data.status === 401 ||
            err.response.data.status === 404
          ) {
            ToastError("다시 로그인해주세요.");
            router.push("/login");
            removeToken();
          }
        }
      } else return Promise.reject(error);
    }
  }
);

export default instance;
