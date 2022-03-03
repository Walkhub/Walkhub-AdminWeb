import React from "react";
import Challenge from "@src/components/challenge";
import { PageType } from "@src/pages/challenge/create";
import { useRouter } from "next/dist/client/router";

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
export default ModifyChallenge;
