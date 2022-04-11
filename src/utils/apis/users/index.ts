import instance from "@src/utils/axios";
import { UserInfoType } from "@src/utils/interfaces/user";

export const getUser = async (): Promise<UserInfoType> => {
  const response = await instance.get("/users/info");
  return response.data;
};
