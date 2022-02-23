import styled from "@emotion/styled";
import React from "react";
import ChallengeCard from "./ChallengeCard";

const ChallengeList = () => {
  return (
    <>
      <Wrapper>
        <Title>진행 중인 챌린지</Title>
        <ListBox>
          {Array(14)
            .fill(-1)
            .map(i => (
              <ChallengeCard key={i} />
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
