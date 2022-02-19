// /* eslint-disable import/no-anonymous-default-export */
import useAuthority from "@src/hooks/useAuthrity";
import ToastError from "@src/utils/function/errorMessage";
import { getToken } from "@src/utils/function/tokenManager";
import { AuthrityType } from "@src/utils/interfaces/auth";
import { useRouter } from "next/dist/client/router";
import { useLayoutEffect } from "react";

function withAuth<T>(
  Component: React.ComponentType<T>,
  option: AuthrityType[]
) {
  const AuthenticateCheck = (props: T) => {
    // const authState = useAuthority();
    const router = useRouter();

    useLayoutEffect(() => {
      if (!getToken().accessToken && !getToken().refreshToken) {
        router.push("/login");
        ToastError("로그인을 해주세요");
      } else if (localStorage.getItem("authrity") === "USER") {
        router.push("/login/certification");
        ToastError("접근 권한이 없습니다.");
      } else if (
        option.findIndex(
          (i: string) => i === localStorage.getItem("authrity")
        ) === -1
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
