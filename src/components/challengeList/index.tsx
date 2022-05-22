import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import React from "react";
import useSWR from "swr";
import ChallengeCard from "./ChallengeCard";

const ChallengeList = () => {
  const { data } = useSWR("/challenges/web/lists?isProgress=true", fetcher);

  console.log(data);

  return (
    <>
      <Wrapper>
        <Title>진행 중인 챌린지</Title>
        <ListBox>
          {data.challenge_list?.map((i: ChallengeType) => (
            <ChallengeCard type={""} key={i.id} {...i} />
          ))}
        </ListBox>
      </Wrapper>
    </>
  );
};

export default ChallengeList;

const Wrapper = styled.div`
  width: 1220px;
  margin: 0 auto;
`;

const Title = styled.div`
  padding: 16px 0;
  font-size: 20px;
  font-weight: 500;
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;
