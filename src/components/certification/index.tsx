import styled from "@emotion/styled";
import useAuthrity from "@src/hooks/useAuthority";
import { certificationTeacherCode } from "@src/utils/apis/teachers";
import ToastError from "@src/utils/function/errorMessage";
import ToastSuccess from "@src/utils/function/successMessage";
import { setToken } from "@src/utils/function/tokenManager";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useRef } from "react";
import CodeInputBox from "./CodeInputBox";

const Certification = () => {
  const router = useRouter();
  const { setAuthority } = useAuthrity();
  const inputRef = useRef<HTMLInputElement[] | null[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const inputArrayToInputValue = () => {
    const dataArray: string[] = [];
    inputRef.current.map(props => {
      if (props instanceof HTMLInputElement) {
        dataArray.push(props.value);
      }
    });
    return dataArray.join("");
  };

  const onSubmitCertification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = inputArrayToInputValue();
    try {
      const data = await certificationTeacherCode(submitData);
      setToken(data.access_token, data.refresh_token);
      setAuthority("TEACHER");
      router.push("/");
      ToastSuccess("로그인에 성공하였습니다!");
    } catch (e) {
      errorHandler(e);
    }
  };

  const inputArrayReset = () => {
    inputRef.current.map(props => {
      if (props instanceof HTMLInputElement) {
        props.value = "";
      }
    });
    inputRef.current[0]?.focus();
  };

  const errorHandler = (err: unknown) => {
    if (axios.isAxiosError(err) && err.response) {
      switch (err.response.status) {
        case 400:
          return ToastError("관리자에게 문의해주세요!");
        case 403:
          ToastError("잘못된 접근입니다");
          return router.push("/login");
        case 404:
          ToastError("인증번호를 다시 입력해주세요");
          return inputArrayReset();
        case 500:
          return ToastError(
            "예기치 못한 에러가 발생하였습니다 관리자에게 문의해주세요"
          );
      }
    } else {
      ToastError("네트워크연결을 다시 확인해주세요");
    }
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
