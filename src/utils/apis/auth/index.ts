import instance from "@src/utils/axios";
import { getToken } from "@src/utils/function/tokenManager";

export const login = async (
  id: string,
  password: string,
  device_token: string
) => {
  try {
    return await instance.post("/users/token", {
      account_id: id,
      password: password,
      device_token: device_token,
    });
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
