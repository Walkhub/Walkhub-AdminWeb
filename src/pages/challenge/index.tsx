import ChallengeList from "@src/components/challengeList";
import Header from "@src/components/common/header";
import withAuth from "@src/hocs/withAuth";
import React from "react";

const ChallengePage = () => {
  return (
    <>
      <Header />
      <ChallengeList />
    </>
  );
};

export default withAuth(ChallengePage, ["SU", "ROOT", "TEACHER"]);
