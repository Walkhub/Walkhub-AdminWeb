import instance from "@src/utils/axios";

export const createImage = async (imageData: FormData) => {
  try {
    return await instance.post(
      "/images",
      {
        images: imageData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
