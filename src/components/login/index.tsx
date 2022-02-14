import styled from "@emotion/styled";
import React, { useState } from "react";

interface LoginInfoType {
  id: string;
  password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    id: "",
    password: "",
  });

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginInfo);
  };

  const loginInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "id" || name === "password") {
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
            name='id'
            onChange={loginInfoChange}
            value={loginInfo.id}
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
        <OptionalBox>
          <p>아이디 찾기</p>
          <i></i>
          <p>비밀번호 변경</p>
        </OptionalBox>
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

const OptionalBox = styled.div`
  display: flex;
  gap: 32px;
  color: ${({ theme }) => theme.color.normal_gray};
  font-size: 14px;
  > p {
    cursor: pointer;
  }
  > i {
    border-right: 1px solid ${({ theme }) => theme.color.normal_gray};
  }
`;

export default Login;
