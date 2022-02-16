import React, { FC } from "react";
import styled from "@emotion/styled";

const NoticeForm: FC = () => {
  return (
    <Wrapper>
      <FormHeadDiv>
        <div>
          <p>대충 공지 제목</p>
          <MoreBtn />
        </div>
        <div>
          <UserDiv>
            <div>img</div>
            <p>정대현</p>
          </UserDiv>
          <EtcDiv>
            <Kindmsg>전체</Kindmsg>
            <div>
              <Datemsg style={{ margin: "0 8px 0 0" }}>2022-01-30</Datemsg>
              <Datemsg>21:50:20</Datemsg>
            </div>
          </EtcDiv>
        </div>
      </FormHeadDiv>
      <HR />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 28px 28px 28px;
  margin-bottom: 36px;
  border: 1px solid ${({ theme }) => theme.color.bright_gray};
  border-radius: 12px;
`;

const FormHeadDiv = styled.div`
  width: 966px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    > p {
      width: 746px;
      font-size: 20px;
      font-weight: medium;
      color: ${({ theme }) => theme.color.black};
    }
  }
`;

const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  background: black;
`;

const HR = styled.hr`
  width: 966px;
  height: 1px;
  border: none;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.color.bright_gray};
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  > div {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    background: black;
    color: white;
  }
  > p {
    font-size: 16px;
    font-weight: Regular;
    color: ${({ theme }) => theme.color.black};
  }
`;

const EtcDiv = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }
`;

const Kindmsg = styled.p`
  font-size: 14px;
  font-weight: Medium;
  text-align: right;
  color: ${({ theme }) => theme.color.main};
`;

const Datemsg = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.dark_gray};
`;

export default NoticeForm;
