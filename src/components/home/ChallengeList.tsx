import React, { FC } from "react";
import { ChallengeType } from "@src/utils/interfaces/challenge";
import ChallengeCard from "./cards/challengeCard/ChallengeCard";

const ChallengeList: FC<{ data: ChallengeType[] }> = ({ data }) => {
  return (
    <>
      {data.map((i: ChallengeType) => {
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
