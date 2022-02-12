import React, { useContext } from "react";
import {
  LoginDispatchContext,
  LoginStateContext,
} from "../../contexts/LoginContext";

const Login = () => {
  const state = useContext(LoginStateContext);
  const dispatch = useContext(LoginDispatchContext);

  const loginInfoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "id" || name === "password")
      dispatch({ type: "LOGIN_INPUT_CHANGE", inputInfo: name, value: value });
  };

  return (
    <div>
      <div>id:{state.id}</div>
      <div>password:{state.password}</div>
      <input
        value={state.id}
        onChange={loginInfoOnChange}
        name='id'
        placeholder='id'
      />
      <input
        value={state.password}
        onChange={loginInfoOnChange}
        name='password'
        placeholder='password'
      />
    </div>
  );
};

export default Login;
