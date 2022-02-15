import instance from "@src/utils/axios";

export const changeSchoolLogo = async (image_url: string) => {
  try {
    await instance.patch("/schools/logos", {
      image_url,
    });
  } catch (error) {
    throw error;
  }
};

export const createRootAccount = async (school_id: number) => {
  try {
    await instance.post(`/su/accounts/${school_id}`);
  } catch (error) {
    throw error;
  }
};
