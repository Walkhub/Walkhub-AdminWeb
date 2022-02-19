import { ALL_Authority, AuthorityType } from "@src/utils/interfaces/auth";
import { useEffect, useState } from "react";

const useAuthrity = () => {
  const [authorityState, setState] = useState<AuthorityType>("USER");
  useEffect(() => {
    const data = localStorage.getItem("authrity");
    if (data && isAuthority(data)) {
      setState(data);
    }
  }, []);

  const isAuthority = (authrity: string): authrity is AuthorityType => {
    return ALL_Authority.includes(authrity as AuthorityType);
  };

  const setAuthority = (authrity: AuthorityType) => {
    authrity
      ? localStorage.setItem("authrity", authrity)
      : localStorage.removeItem("authrity");
    setState(authrity);
  };

  return { authorityState, setAuthority };
};

export default useAuthrity;
