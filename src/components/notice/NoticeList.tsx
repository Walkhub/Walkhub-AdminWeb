import React, { FC } from "react";
import styled from "@emotion/styled";

const NoticeList: FC = () => {
  return (
    <Wrapper>
      <WriteDiv>
        <em>공지사항 작성하기...</em>
      </WriteDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1016px;
  margin: 60px auto;
  display: flex;
  justify-content: center;
`;

const WriteDiv = styled.div`
  width: 100%;
  height: 72px;
  padding: 27px 820px 27px 27px;
  border-radius: 12px;
  margin-bottom: 36px;
  background: ${({ theme }) => theme.color.light_gray};
  color: ${({ theme }) => theme.color.dark_gray};
  > em {
    font-size: 18px;
  }
`;

export default NoticeList;
