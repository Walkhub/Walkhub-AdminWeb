import Challenge from "@src/components/challenge";
import React from "react";

export type PageType = "create" | "modify";

const ChallengeCreatePage: React.FC = () => {
  return <Challenge pageType={"create"} />;
};
export default ChallengeCreatePage;
