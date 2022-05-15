import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import { TeacherType } from "@src/utils/interfaces/teacher";
import React from "react";
import useSWR from "swr";
import SchoolInfo from "./SchoolInfo";
import TeacherCard from "./TeacherCard";

const TeacherManagement = () => {
  const { data } = useSWR("/teachers/classes/lists", fetcher);

  return (
    <>
      <WrapperBox>
        <SchoolInfo />

        <Certification>
          인증코드 <p>#{data.auth_code}</p>
        </Certification>

        <Box>
          <Title>선생님 관리</Title>
          <List>
            {data.class_list?.map((i: TeacherType) => (
              <TeacherCard key={i.teacher.user_id} {...i} />
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
