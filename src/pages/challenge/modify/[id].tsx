import React from "react";
import { useRouter } from "next/dist/client/router";
import withAuth from "@src/hocs/withAuth";
import Challenge from "@src/components/challengeCreate";

const ModifyChallenge: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  if (Array.isArray(id)) return <></>;
  return (
    <>
      <Challenge pageType='modify' id={id} />
    </>
  );
};
export default withAuth(ModifyChallenge, ["ROOT", "SU", "TEACHER"]);
