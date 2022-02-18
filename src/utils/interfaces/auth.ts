export interface TokenType {
  access_token: string;
  refresh_token: string;
}

export const ALL_Authority = ["USER", "TEACHER", "ROOT", "SU"] as const;

type AuthorityTuple = typeof ALL_Authority;

export type AuthorityType = AuthorityTuple[number];

export interface LoginInfoType {
  account_id: string;
  password: string;
}

export interface LoginResponseType extends TokenType {
  expired_at: string;
  authority: AuthorityType;
  height: number;
  weight: number;
  sex: "MALE" | "FEMALE" | "X";
}
