import axios from "axios";
import cookies from "react-cookies";

const EXPIRES_TIME = 1000 * 60 * 60 * 24;

export const setToken = (accessToken: string, refreshToken: string) => {
  axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
  const expires = new Date();
  expires.setDate(Date.now() + EXPIRES_TIME);

  cookies.save("accessToken", accessToken, {
    path: "/",
    expires,
    httpOnly: process.env.NEXT_PUBLIC_HTTP_ONLY === "true",
  });

  cookies.save("refrashToken", refreshToken, {
    path: "/",
    expires,
    httpOnly: process.env.NEXT_PUBLIC_HTTP_ONLY === "true",
  });
};

export const removeToken = () => {
  cookies.remove("accessToken");
  cookies.remove("refrashToken");
};

export const getToken = () => {
  const { accessToken, refrashToken } = cookies.select();
  return { accessToken, refrashToken };
};
