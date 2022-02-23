import styled from "@emotion/styled";
import React from "react";
import ClassList from "./ClassList";
import ChallengeList from "./ChallengeList";
import SchoolInfo from "./SchoolInfo";
import StudentFilter from "./StudentFilter";

const Home = () => {
  return (
    <>
      <HomeBox>
        <SchoolInfo />

        <Box>
          <Title>클래스</Title>
          <List>
            <ClassList />
          </List>
        </Box>

        <Box>
          <Title>진행 중인 챌린지</Title>
          <List>
            <ChallengeList />
          </List>
        </Box>

        <Box>
          <StudentFilter />
        </Box>
      </HomeBox>
    </>
  );
};

export default Home;

const HomeBox = styled.div`
  width: 1220px;
  margin: 0 auto;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 24px;
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
  display: flex;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
