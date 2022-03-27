import React, { FC } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";
import axios from "axios";
import ToastError from "@src/utils/function/errorMessage";

const ModifyRoot = () => {
  const modifyRootSubmit = async (e: any) => {
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
          return ToastError("인증에 실패하였습니다.");
        case 403:
          return ToastError("권한이 없습니다.");
        case 409:
          return ToastError("이미 학교가 있습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <PostBox>
        <h3>루트 선생님 수정</h3>
        <p>아이디와 비밀번호는 수정할 수 없습니다.</p>
        <InputDiv>
          <p>학교 이름</p>
          <SchoolInput placeholder='학교 이름' />
        </InputDiv>
        <DefaultBtn value='수정' />
      </PostBox>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 600px;
  height: 642px;
  padding: 127px 104px 183px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3 {
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 12px;
  }
  > p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    margin-bottom: 73px;
  }
`;

const InputDiv = styled.div`
  width: 392px;
  height: 84px;
  margin-bottom: 48px;
  > p {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 12px;
  }
`;

const SchoolInput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
`;

export default ModifyRoot;