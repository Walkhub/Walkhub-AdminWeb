import { ALL_Authority, AuthorityType } from "../interfaces/auth";

export const isAuthority = (
  authrity: string | null
): authrity is AuthorityType => {
  return ALL_Authority.includes(authrity as AuthorityType);
};

export const getAuthority = () => {
  const authority = localStorage.getItem("authority");
  return isAuthority(authority) ? authority : "USER";
};

export const setAuthority = (data: AuthorityType) => {
  localStorage.setItem("authority", data);
};

export const resetAuthority = () => {
  localStorage.setItem("authority", "");
};
