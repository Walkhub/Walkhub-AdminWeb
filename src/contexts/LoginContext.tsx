import { createContext, Dispatch, useReducer } from "react";

interface LoginStateType {
  id: string;
  password: string;
}

type LoginAction = {
  type: "Input";
  inputInfo: "id" | "password";
  value: string;
};

type loginDispatch = Dispatch<LoginAction>;

const LoginContextProvider: React.FC = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    loginDefaultValue
  );
  return (
    <LoginStateContext.Provider value={loginState}>
      <LoginDispatchContext.Provider value={loginDispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
};

export const loginDefaultValue: LoginStateType = {
  id: "",
  password: "",
};

export const LoginStateContext =
  createContext<LoginStateType>(loginDefaultValue);
export const LoginDispatchContext = createContext<loginDispatch>(() => null);

export const loginReducer = (
  state: LoginStateType,
  action: LoginAction
): LoginStateType => {
  switch (action.type) {
    case "Input":
      return {
        ...state,
        [action.inputInfo]: [action.value],
      };
    default:
      return state;
  }
};
export default LoginContextProvider;
