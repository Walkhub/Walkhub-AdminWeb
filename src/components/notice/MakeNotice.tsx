import React, { FC } from "react";
import styled from "@emotion/styled";
import DefaultBtn from "../common/defaultBtn/DefaultBtn";

const MakeNotice = () => {
  return (
    <Wrapper>
      <HeadDiv>
        <button>드롭다운</button>
      </HeadDiv>
      <ContentDiv>
        <TitleInput type='text' placeholder='제목을 입력하세요' />
        <ContentInput placeholder='내용을 입력하세요' />
      </ContentDiv>
      <PostDiv>
        <DefaultBtn width={106} />
      </PostDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 27px 40px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  background: ${({ theme }) => theme.color.light_gray};
  display: flex;
  flex-direction: column;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  > button {
    width: 82px;
    height: 24px;
    color: black;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px 20px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
`;

const PostDiv = styled.div`
  display: flex;
  justify-content: space-end;
`;

export default MakeNotice;
