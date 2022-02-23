import styled from "@emotion/styled";
import React from "react";
import TeacherCard from "./TeacherCard";

const TeacherManagement = () => {
  return (
    <>
      <WrapperBox>
        <Certification>
          인증코드 <p>#187293</p>
        </Certification>

        <Box>
          <Title>선생님 관리</Title>
          <List>
            {Array(20)
              .fill(-1)
              .map(i => (
                <TeacherCard key={i} />
              ))}
          </List>
        </Box>
      </WrapperBox>
    </>
  );
};

export default TeacherManagement;

const WrapperBox = styled.div`
  width: 1220px;
  margin: 0 auto;
  margin-top: 30px;
`;

const Certification = styled.div`
  color: ${({ theme }) => theme.color.black};
  font-size: 16px;
  display: flex;
  align-items: center;
  p {
    color: ${({ theme }) => theme.color.main};
    font-size: 20px;
    margin-left: 10px;
  }
`;

const Box = styled.div`
  width: 100%;
`;

const Title = styled.div`
  padding: 16px 0;
  font-size: 20px;
  font-weight: 500;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
