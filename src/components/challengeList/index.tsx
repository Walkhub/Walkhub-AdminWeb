import styled from "@emotion/styled";
import fetcher from "@src/utils/function/fetcher";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import React, { useState } from "react";
import useSWR from "swr";
import Dropdown from "../common/dropdown";
import ChallengeCard from "./ChallengeCard";
import Link from "next/link";
import CreateBox from "../common/createBox";

const optionList = [
  {
    value: "true",
    optionName: "진행중",
  },
  {
    value: "false",
    optionName: "완료",
  },
];

const ChallengeList = () => {
  const [option, setOption] = useState("true");
  const [isHover, setIsHover] = useState<boolean>(false);

  const { data, mutate } = useSWR(
    "/challenges/web/lists?isProgress=true",
    fetcher
  );

  const ChangeOption = async (value, name) => {
    setOption(value);
    console.log(name);
    const updateData = await fetcher(
      `/challenges/web/lists?isProgress=${value}`
    );
    mutate(updateData, false);
  };

  return (
    <>
      <Wrapper>
        <Title>
          <div>진행 중인 챌린지</div>
          <Dropdown
            width={108}
            height={16}
            selectedValue={option === "true" ? "진행중" : "완료"}
            name='name'
            optionList={optionList}
            setSelectedValue={ChangeOption}
            disabled={false}
            lineHeight={24}
            fontSize={16}
            fontWeight='normal'
            padding='12px 16px'
            isBoard={false}
          />
        </Title>
        <ListBox>
          <Link href='/challenge/create'>
            <CreateBox width={288} height={288} />
          </Link>
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
  display: flex;
  align-items: center;
  div {
    margin-right: 20px;
  }
`;

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const PlusBtn = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
