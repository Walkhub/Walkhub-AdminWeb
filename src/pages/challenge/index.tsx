import Challenge from "@src/components/challenge";
import React from "react";

export enum PageType {
  make = "생성",
  modify = "수정"
}

const ChallengePage: React.FC = () => {
  return <Challenge PageType={PageType.make} />;
};
export default ChallengePage;
