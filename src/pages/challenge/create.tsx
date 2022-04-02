import Challenge from "@src/components/challengeCreate";
import withAuth from "@src/hocs/withAuth";
import React from "react";

export type PageType = "create" | "modify";

const ChallengeCreatePage: React.FC = () => {
  return <Challenge pageType={"create"} />;
};
export default withAuth(ChallengeCreatePage, ["ROOT", "SU", "TEACHER"]);
