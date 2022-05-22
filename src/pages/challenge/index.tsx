import ChallengeList from "@src/components/challengeList";
import Header from "@src/components/common/header";
import withAuth from "@src/hocs/withAuth";
import fetcher from "@src/utils/function/fetcher";
import React from "react";
import { SWRConfig } from "swr";

export async function getStaticProps() {
  const url = `/challenges/web/lists?isProgress=true`;
  const challenges = await fetcher(url);

  return {
    props: {
      fallback: {
        "/challenges/web/lists?isProgress=true": challenges,
      },
    },
  };
}

const ChallengePage = ({ fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <ChallengeList />
      </SWRConfig>
    </>
  );
};

export default withAuth(ChallengePage, ["SU", "ROOT", "TEACHER"]);
