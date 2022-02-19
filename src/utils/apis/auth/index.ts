import instance from "@src/utils/axios";
import { getToken } from "@src/utils/function/tokenManager";
import { LoginInfoType, LoginResponseType } from "@src/utils/interfaces/auth";
import axios, { AxiosResponse } from "axios";

export const login = async (loginInfo: LoginInfoType) => {
  try {
    const response: AxiosResponse<LoginResponseType> = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/token`,
      {
        ...loginInfo,
        device_token: "dmlcks",
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    return await instance.patch("/users/token", {
      refresh_token: getToken().refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
