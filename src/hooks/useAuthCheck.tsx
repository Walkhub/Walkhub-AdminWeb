import { getAuthority } from "@src/utils/function/localstorgeAuthority";
import { AuthorityType } from "@src/utils/interfaces/auth";
import { useEffect, useState } from "react";

const useAuthCheck = (option: AuthorityType[]) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (option.find((i: string) => i === getAuthority())) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return { isAuth, setIsAuth };
};

export default useAuthCheck;
