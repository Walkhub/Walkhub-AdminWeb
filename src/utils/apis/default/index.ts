import instance from "@src/utils/axios";

export const createImage = async (imageData: FormData) => {
  try {
    return await instance.post("/images", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const changeToExcel = async () => {
  try {
    return await instance.get("/excel");
  } catch (err) {
    throw err;
  }
};
