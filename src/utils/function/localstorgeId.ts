export const getId = () => {
  const id = localStorage.getItem("account_id");
  return id || "";
};

export const setId = (account_id: string) => {
  localStorage.setItem("account_id", account_id);
};

export const removeId = () => {
  localStorage.removeItem("account_id");
};
