import React, { FC } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";

const ReissuancePW = () => {
  return (
    <Wrapper>
      <PostBox>
        <h3>비밀번호 재발급</h3>
        <p>
          학교 이름을 입력하고 확인버튼을 누르면
          <br /> 루트 선생님의 비밀번호를 재발급합니다.
        </p>
        <InputDiv>
          <SchoolInput placeholder='학교 이름을 입력해주세요' />
        </InputDiv>
        <DefaultBtn value='확인' />
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
  padding: 127px 104px 182px;
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
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    margin-bottom: 67px;
  }
`;

const InputDiv = styled.div`
  width: 392px;
  height: 84px;
  margin-bottom: 48px;
  > div {
    display: flex;
    > p {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.black};
      margin-bottom: 12px;
    }
  }
`;

const BlueStar = styled.strong`
  color: ${({ theme }) => theme.color.main};
`;

const SchoolInput = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
`;

export default ReissuancePW;
