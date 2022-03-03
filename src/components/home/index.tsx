import styled from "@emotion/styled";
import React from "react";
import ClassList from "./lists/ClassList";
import ChallengeList from "./lists/ChallengeList";
import SchoolInfo from "./SchoolInfo";
import StudentFilter from "./StudentFilter";
import useAuthCheck from "@src/hooks/useAuthCheck";
import SchoolFilter from "./SchoolFilter";

const Home = () => {
  const { isAuth } = useAuthCheck(["ROOT", "TEACHER"]);

  return (
    <>
      <HomeBox>
        <SchoolInfo />

        {isAuth && (
          <Box>
            <Title>클래스</Title>
            <List>
              <ClassList />
            </List>
          </Box>
        )}

        <Box>
          <Title>진행 중인 챌린지</Title>
          <List>
            <ChallengeList />
          </List>
        </Box>

        <Box>{isAuth ? <StudentFilter /> : <SchoolFilter />}</Box>
      </HomeBox>
    </>
  );
};

export default Home;

const HomeBox = styled.div`
  width: 1220px;
  margin: 0 auto;
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
  display: flex;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
