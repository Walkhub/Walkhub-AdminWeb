import styled from "@emotion/styled";
import { login } from "@src/utils/apis/auth";
import ToastError from "@src/utils/function/errorMessage";
import { setToken } from "@src/utils/function/tokenManager";
import { LoginInfoType, LoginResponseType } from "@src/utils/interfaces/auth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    account_id: "",
    password: "",
  });
  const router = useRouter();

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const info = await login(loginInfo);
      successHandler(info);
    } catch (e) {
      errorHandler(e);
    }
  };

  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e) && e.response) {
      switch (e.response.status) {
        case 400:
          return ToastError("모든 빈칸을 채워주세요.");
        case 401:
          ToastError("비밀번호를 다시 확인해 주세요.");
          return setLoginInfo({ ...loginInfo, password: "" });
        case 404:
          ToastError("회원이 존재하지 않습니다. 아이디를 다시 확인해 주세요");
          return setLoginInfo({ password: "", account_id: "" });
        case 500:
          return ToastError("관리자에게 문의해주세요");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  const successHandler = (info: LoginResponseType) => {
    setToken(info.access_token, info.refresh_token);
    info.authority === "USER"
      ? router.push("/login/certification")
      : router.push("/");
  };

  const loginInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "account_id" || name === "password") {
      setLoginInfo({
        ...loginInfo,
        [name]: value,
      });
    }
  };

  return (
    <Container onSubmit={loginSubmit}>
      <LoginBox>
        <h1>로고</h1>
        <InputArea>
          <input
            placeholder='아이디'
            name='account_id'
            onChange={loginInfoChange}
            value={loginInfo.account_id}
          />
          <input
            placeholder='비밀번호'
            name='password'
            onChange={loginInfoChange}
            value={loginInfo.password}
          />
          <img></img>
        </InputArea>
        <IdSaveBox>
          <img />
          <p>아이디 저장</p>
        </IdSaveBox>
        <LoginButton type='submit' value='로그인'></LoginButton>
      </LoginBox>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 100px 104px 80px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  > h1 {
    color: ${({ theme }) => theme.color.black};
    font-size: 36px;
    font-weight: bold;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  position: relative;
  margin-top: 54px;
  > input {
    height: 48px;
    border-radius: 12px;
    padding: 0 20px;
    border: 1px solid ${({ theme }) => theme.color.normal_gray};
    color: ${({ theme }) => theme.color.black};
    font-size: 16px;
    font-weight: 400;

    :focus {
      border: 1px solid ${({ theme }) => theme.color.main};
    }
  }
  > img {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: black;
    bottom: 12px;
    right: 16px;
    cursor: pointer;
  }
`;

const IdSaveBox = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin: 16px 0 80px;
  align-items: center;
  > p {
    color: ${({ theme }) => theme.color.black};
  }
  > img {
    width: 24px;
    height: 24px;
  }
`;

const LoginButton = styled.input`
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.main};
  font-size: 14px;
  border-radius: 8px;
  height: 48px;
  width: 100%;
  color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 54px;
`;

export default Login;
