import instance from "@src/utils/axios";

export const createNotice = async (
  title: string,
  content: string,
  scope: string
) => {
  try {
    await instance.post("/notices", {
      title,
      content,
      scope,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteNotice = async (notice_id: string) => {
  try {
    await instance.delete(`/notices/${notice_id}`);
  } catch (error) {
    throw error;
  }
};
