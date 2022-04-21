import instance from "@src/utils/axios";
import { AxiosResponse } from "axios";
import { TokenType } from "@src/utils/interfaces/auth";

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

export const deleteClass = async (section_id: string | string[]) => {
  try {
    await instance.delete(`/classes/${section_id}`);
  } catch (error) {
    throw error;
  }
};
