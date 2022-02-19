import { ALL_Authrity, AuthrityType } from "@src/utils/interfaces/auth";
import { useEffect, useState } from "react";

const useAuthority = () => {
  const [authorityState, setState] = useState<AuthrityType>();
  useEffect(() => {
    const data = localStorage.getItem("authrity");
    if (data && isAuthority(data)) {
      setState(data);
    }
  }, []);

  const isAuthority = (authrity: string): authrity is AuthrityType => {
    return ALL_Authrity.includes(authrity as AuthrityType);
  };

  const setAuthority = (authrity: AuthrityType) => {
    authrity
      ? localStorage.setItem("authrity", authrity)
      : localStorage.removeItem("authrity");
    setState(authrity);
  };

  return { authorityState, setAuthority };
};

export default useAuthority;
