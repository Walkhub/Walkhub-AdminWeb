import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import NoticeForm from "./NoticeForm";
import MakeNotice from "./MakeNotice";

const Notice: FC = () => {
  const [makeState, setMakeState] = useState(true);

  const MakeOnClick = () => {
    setMakeState(false);
    console.log(makeState);
  };

  return (
    <Wrapper>
      {makeState ? (
        <WriteDiv onClick={MakeOnClick}>
          <em>공지사항 작성하기...</em>
        </WriteDiv>
      ) : (
        <MakeNotice />
      )}
      <NoticeTitleDiv>
        <p>공지</p>
      </NoticeTitleDiv>
      <NoticeListDiv>
        <NoticeForm />
        <NoticeForm />
      </NoticeListDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1016px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WriteDiv = styled.div`
  width: 100%;
  height: 72px;
  padding: 27px 820px 27px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  cursor: pointer;
  background: ${({ theme }) => theme.color.light_gray};
  color: ${({ theme }) => theme.color.dark_gray};
  > em {
    font-size: 18px;
  }
`;

const NoticeTitleDiv = styled.div`
  width: 100%;
  height: 41px;
  margin-bottom: 20px;
  > p {
    font-size: 28px;
    font-weight: medium;
    color: ${({ theme }) => theme.color.black};
  }
`;

const NoticeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Notice;
