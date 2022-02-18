import { ALL_Authrity, AuthrityType } from "@src/utils/interfaces/auth";
import { useEffect, useState } from "react";

const useAuthrity = () => {
  const [authrityState, setState] = useState<AuthrityType>("USER");
  useEffect(() => {
    const data = localStorage.getItem("authrity");
    if (data && isAuthrity(data)) {
      setState(data);
    }
  }, []);

  const isAuthrity = (authrity: string): authrity is AuthrityType => {
    return ALL_Authrity.includes(authrity as AuthrityType);
  };

  const setAuthrity = (authrity: AuthrityType) => {
    authrity
      ? localStorage.setItem("authrity", authrity)
      : localStorage.removeItem("authrity");
    setState(authrity);
  };

  return { authrityState, setAuthrity };
};

export default useAuthrity;
