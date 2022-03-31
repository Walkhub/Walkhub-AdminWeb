// /* eslint-disable import/no-anonymous-default-export */
import ToastError from "@src/utils/function/errorMessage";
import { getToken } from "@src/utils/function/tokenManager";
import { AuthorityType } from "@src/utils/interfaces/auth";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function withAuth<T>(
  Component: React.ComponentType<T>,
  option: AuthorityType[]
) {
  const AuthenticateCheck = (props: T) => {
    const router = useRouter();

    useEffect(() => {
      if (!getToken().accessToken && !getToken().refreshToken) {
        router.push("/login");
        ToastError("로그인을 해주세요");
      } else if (
        !option.find((i: string) => i === localStorage.getItem("authority"))
      ) {
        router.back();
        ToastError("접근 권한이 없습니다.");
      }
    }, []);

    return <Component {...props} />;
  };

  return AuthenticateCheck;
}

export default withAuth;
