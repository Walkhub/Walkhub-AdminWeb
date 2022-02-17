import styled from "@emotion/styled";
import { certificationTeacherCode } from "@src/utils/apis/teachers";
import { setToken } from "@src/utils/function/tokenManager";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import CodeInputBox from "./CodeInputBox";
const Certification = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement[] | null[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const onSubmitCertification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container onSubmit={onSubmitCertification}>
      <ContentBox>
        <ExclamationMarkBox>!</ExclamationMarkBox>
        <TextBox>
          <h1>접근 권한이 없습니다</h1>
          <h2>발급받은 인증코드를 입력해주세요</h2>
        </TextBox>
        <CodeInputBox inputRef={inputRef}></CodeInputBox>
        <SubmitButton type='submit' value='인증' />
      </ContentBox>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExclamationMarkBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.color.main};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.main};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
  margin-bottom: 60px;
  > h1 {
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
  }
  > h2 {
    font-size: 17px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const SubmitButton = styled.input`
  width: 168px;
  height: 44px;
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.main};
  margin-top: 50px;
  cursor: pointer;
`;

export default Certification;
