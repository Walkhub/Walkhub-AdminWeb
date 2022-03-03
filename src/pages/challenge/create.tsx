import Challenge from "@src/components/challenge";
import React from "react";

export enum PageType {
  make = "생성",
  modify = "수정"
}

const ChallengeCreatePage: React.FC = () => {
  return <Challenge PageType={PageType.make} />;
};
export default ChallengeCreatePage;