import instance from "@src/utils/axios";
import { AxiosResponse } from "axios";
import { TokenType } from "@src/utils/interfaces/auth";
import { ClassType } from "@src/utils/interfaces/class";

export const certificationTeacherCode = async (code: string) => {
  try {
    const res: AxiosResponse<TokenType> = await instance.patch(
      "/teachers/verification-codes",
      { code }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createClass = async (grade: number, classNum: number) => {
  try {
    return await instance.post("/teachers/classes", {
      grade: grade,
      class_num: classNum,
    });
  } catch (error) {
    throw error;
  }
};

export const getClass = async (section_id: number) => {
  try {
    const response = await instance.get(`/teachers/classes/${section_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
