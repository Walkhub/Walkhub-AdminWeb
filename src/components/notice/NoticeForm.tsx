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
      <TextDiv>
        <p>
          보고, 이 가득 옥 헤는 봅니다. 별들을 쉬이 다 당신은 겨울이 것은
          까닭입니다. 시인의 옥 그리워 지나가는 된 있습니다. 이름을 나의 별에도
          마리아 별들을 어머니, 된 있습니다. 소학교 아직 하나에 언덕 가을로
          걱정도 하나에 별이 파란 봅니다. 사랑과 내일 쉬이 까닭입니다. 것은 차
          나는 위에 무덤 하나에 봄이 이름과, 까닭입니다. 별이 오면 패, 무성할
          남은 별 거외다. 묻힌 아스라히 했던 까닭입니다. 그러나 이런 잔디가 이
          하나에 멀듯이, 별 이름과, 이름과, 있습니다. 북간도에 이름과, 별에도
          하늘에는 노루, 강아지, 쓸쓸함과 속의 오는 계십니다.
        </p>
      </TextDiv>
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
  width: 960px;
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
  width: 960px;
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

const TextDiv = styled.div`
  width: 100%;
  > p {
    font-size: 16px;
    font-weight: Regular;
    color: ${({ theme }) => theme.color.black};
  }
`;

export default NoticeForm;