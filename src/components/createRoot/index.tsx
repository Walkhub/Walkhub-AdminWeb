import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import ToastError from "@src/utils/function/errorMessage";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";

const CreateRoot = () => {
  const [loginInfo, setLoginInfo] = useState({
    school_name: "",
    password: "",
  });

  const router = useRouter();

  const createSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
          return setLoginInfo({ password: "", school_name: "" });
        case 500:
          return ToastError("관리자에게 문의해주세요");
      }
    } else {
      ToastError("네트워크 연결을 확인해주세요.");
    }
  };

  const rootInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "school_name") {
      setLoginInfo({
        ...loginInfo,
        [name]: value,
      });
    }
  };

  return (
    <Container onSubmit={createSubmit}>
      <CreateBox>
        <h1>루트 선생님 생성</h1>
        <p>아이디와 비밀번호는 자동 생성됩니다.</p>
        <InputArea>
          <div>
            학교 이름 <p>*</p>
          </div>
          <input
            placeholder='학교 이름'
            name='school_name'
            onChange={rootInfoChange}
            value={loginInfo.school_name}
          />
          <SearchBox>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
            <div>대덕소프트웨어마이스터고등학교</div>
          </SearchBox>
        </InputArea>
        <CreateButton type='submit' value='생성' />
      </CreateBox>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateBox = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 100px 104px 80px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${({ theme }) => theme.color.black};
    font-size: 32px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.main};
  }
`;

const fadeIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const SearchBox = styled.div`
  width: 392px;
  max-height: 150px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  z-index: 3;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 15px;
  animation: ${fadeIn} 0.5s linear;
  div {
    padding: 15px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin: 54px 0;
  div {
    display: flex;
    font-size: 16px;
  }
  input {
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
`;

const CreateButton = styled.input`
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

export default CreateRoot;
