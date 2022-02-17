import React, { FC } from "react";
import styled from "@emotion/styled";

const StudentList: FC = () => {
  return (
    <Wrapper>
      <Title>
        <p>학생 확인</p>
        <p>드롭다운</p>
      </Title>
      <TypeMenuDiv>
        <p style={{ margin: "0 80px 0 468px" }}>평균 걸음 수</p>
        <p>종합 걸음 수</p>
        <p>평균 거리</p>
        <p>종합 거리</p>
      </TypeMenuDiv>
      <UserList></UserList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1224px;
  margin: 0 auto 36px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > p {
    font-size: 28px;
    font-style: normal;
    font-weight: medium;
    margin-right: 16px;
  }
`;

const TypeMenuDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  > p {
    margin-right: 80px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const UserList = styled.div``;

export default StudentList;
