import React from "react";
import styled from "@emotion/styled";

const StudentForm = () => {
  return (
    <Wrapper>
      <ProfileDiv>
        <button>img</button>
        <ProfileInfoDiv>
          <ProfileName>김범진</ProfileName>
          <StudentInfo>
            <p>n학년</p>
            <p>n반</p>
            <p>n번</p>
          </StudentInfo>
        </ProfileInfoDiv>
      </ProfileDiv>
      <ReportDiv>
        <p>12000</p>
        <p>2000000</p>
        <p>0.1</p>
        <p>0.12</p>
      </ReportDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px 150px 20px 20px;
  border: 1px solid ${({ theme }) => theme.color.normal_gray};
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const ProfileDiv = styled.div`
  display: flex;
  margin-right: 255px;
  > button {
    width: 60px;
    height: 60px;
    margin-right: 24px;
    border-radius: 30px;
    background: black;
    color: white;
  }
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.p`
  font-size: 18px;
  font-weight: medium;
  color: ${({ theme }) => theme.color.black};
`;

const StudentInfo = styled.div`
  display: flex;
  > p {
    font-size: 16px;
    margin-right: 5px;
    color: ${({ theme }) => theme.color.dark_gray};
  }
`;

const ReportDiv = styled.div`
  width: 596px;
  display: flex;
  justify-content: space-between;
  > p {
    font-size: 20px;
    color: ${({ theme }) => theme.color.black};
  }
`;

export default StudentForm;
