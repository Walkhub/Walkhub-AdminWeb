import instance from "@src/utils/axios";

export const createTeacherCode = async () => {
  try {
    return await instance.post("/teachers/verification-codes");
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
