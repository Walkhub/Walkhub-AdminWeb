import styled from "@emotion/styled";
import React from "react";
import DefaultBox from "../common/defaultBox";
import DefaultSelect from "../common/defaultSelect";
import ClassList from "./ClassList";
import ChallengeList from "./ChallengeList";
import SchoolInfo from "./SchoolInfo";
import StudentList from "./StudentList";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

const Home = () => {
  const { data: challengeData, mutate } = useSWR("/challenges/lists", fetcher);

  console.log(challengeData);

  const asd = () => {
    mutate();
  };

  return (
    <>
      <HomeBox>
        <SchoolInfo />

        <Box>
          <Title onClick={asd}>클래스</Title>
          <List>
            <ClassList />
          </List>
        </Box>

        <Box>
          <Title>진행 중인 챌린지</Title>
          <List>
            <ChallengeList data={challengeData.challenge_list} />
          </List>
        </Box>

        <Box>
          <Title>검색</Title>
          <StudetnSearchBox>
            <DefaultBox width={748} height={48} />
            <DefaultSelect />
            <DefaultSelect />
            <DefaultSelect />
          </StudetnSearchBox>

          <div>액셀로 변환</div>

          <Test>
            <div style={{ gridColumn: "4 / 5" }}>평균 걸음 수</div>
            <div>총합 걸음 수</div>
            <div>평균 거리(km)</div>
            <div>총합 거리(km)</div>
          </Test>

          <div>
            <StudentList />
          </div>
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

const StudetnSearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Test = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(8, 1fr);
  font-size: 16px;
  color: ${({ theme }) => theme.color.dark_gray};
`;
