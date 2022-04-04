import ChallengeDetail from "@src/components/challengeDetail/index";
import { useRouter } from "next/router";
import React from "react";

const ChallengeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const challengeId = Number(id);
  return <ChallengeDetail challengeId={challengeId} />;
};
export default ChallengeDetailPage;
