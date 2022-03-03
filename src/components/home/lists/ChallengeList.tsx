import React, { FC } from "react";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import ChallengeCard from "../cards/ChallengeCard";
import useSWR from "swr";
import fetcher from "@src/utils/function/fetcher";

const ChallengeList = () => {
  const { data } = useSWR("/challenges/lists", fetcher);

  return (
    <>
      {data.challenge_list?.map((i: ChallengeType) => {
        return (
          <div style={{ marginRight: "22px" }} key={i.id}>
            <ChallengeCard {...i} />
          </div>
        );
      })}
    </>
  );
};

export default ChallengeList;
