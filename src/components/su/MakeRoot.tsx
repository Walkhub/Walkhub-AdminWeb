import React, { FC } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";

const MakeRoot = () => {
  return (
    <Wrapper>
      <PostBox>
        <h3>루트 선생님 생성</h3>
        <p>아이디와 비밀번호는 자동 생성 됩니다.</p>
        <InputDiv>
          <p>학교 이름</p>
          <SchoolInput placeholder='학교 이름' />
        </InputDiv>
        <DefaultBtn value='생성' />
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

export default MakeRoot;
