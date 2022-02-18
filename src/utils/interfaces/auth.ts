export interface TokenType {
  access_token: string;
  refresh_token: string;
}

export const ALL_Authrity = ["USER", "TEACHER", "ROOT", "SU"] as const;

type AuthrityTuple = typeof ALL_Authrity;

export type AuthrityType = AuthrityTuple[number];

export interface LoginInfoType {
  account_id: string;
  password: string;
}

export interface LoginResponseType extends TokenType {
  expired_at: string;
  authority: AuthrityType;
  height: number;
  weight: number;
  sex: "MALE" | "FEMALE" | "X";
}
