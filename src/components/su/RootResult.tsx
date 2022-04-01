import React from "react";
import styled from "@emotion/styled";

const RootResult = () => {
  return (
    <Wrapper>
      <h1>생성이 완료되었습니다.</h1>
      <TextDiv>
        <h6>
          학교관리 &#62; 학교 상세 페이지 &#62; 루트 선생님 관리 페이지에서
          확인해주세요.
        </h6>
        <p>이동하기</p>
      </TextDiv>
      <CardDiv>
        <BlueLine />
        <CardBox>
          <h1>대덕소프트웨어마이스터고등학교</h1>
          <InfoDiv>
            <div>
              <p>아이디</p>
              <BlueText>QWER1234</BlueText>
            </div>
            <div>
              <p>비밀번호</p>
              <BlueText>QWER1234</BlueText>
            </div>
          </InfoDiv>
        </CardBox>
      </CardDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 100px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 12px;
  }
`;

const TextDiv = styled.div`
  display: flex;
  margin-bottom: 48px;
  > h6 {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.dark_gray};
  }
  > p {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
    text-decoration: underline;
    cursor: pointer;
    margin-left: 12px;
  }
`;

const CardDiv = styled.div`
  width: 807px;
  height: 242px;
  display: flex;
`;

const BlueLine = styled.div`
  width: 12px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.main};
`;

const CardBox = styled.div`
  width: 975px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.light_gray};
  padding: 54px 0 54px 48px;
  > h1 {
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 28px;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  > div {
    margin-right: 80px;
    > p {
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.color.dark_gray};
      margin-bottom: 12px;
    }
  }
`;

const BlueText = styled.strong`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.main};
`;

export default RootResult;
