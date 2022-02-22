import { ALL_Authority, AuthorityType } from "@src/utils/interfaces/auth";
import { useEffect, useState } from "react";

const useAuthority = () => {
  const [authorityState, setState] = useState<AuthorityType>("USER");
  useEffect(() => {
    const data = localStorage.getItem("authority");
    if (data && isAuthority(data)) {
      setState(data);
    }
  }, []);


  const isAuthority = (authority: string): authority is AuthorityType => {
    return ALL_Authority.includes(authority as AuthorityType);
  };

  const setAuthority = (authority: AuthorityType) => {
    authority
      ? localStorage.setItem("authority", authority)
      : localStorage.removeItem("authority");
    setState(authority);
  };

  return { authorityState, setAuthority };
};

export default useAuthority;
