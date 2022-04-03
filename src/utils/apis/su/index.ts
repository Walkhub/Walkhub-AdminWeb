import instance from "@src/utils/axios";

export const createRoot = async (school_id: number) => {
  try {
    await instance.post(`/su/accounts/${school_id}`, { school_id });
  } catch (error) {
    throw error;
  }
};

export const patchRootPassWord = async (school_id: number) => {
  try {
    await instance.patch(`/su/accounts/${school_id}`, { school_id });
  } catch (error) {
    throw error;
  }
};
