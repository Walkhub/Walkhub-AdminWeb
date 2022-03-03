import { getAuthority } from "@src/utils/function/localstorgeAuthority";
import { AuthorityType } from "@src/utils/interfaces/auth";
import { useLayoutEffect, useState } from "react";

const useAuthCheck = (option: AuthorityType[]) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (option.find((i: string) => i === getAuthority())) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return { isAuth, setIsAuth };
};

export default useAuthCheck;
