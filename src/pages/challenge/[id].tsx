import ChallengeDetail from "@src/components/challengeDetail/index";
import {
  getChallengeDetails,
  getChallengeParticipants,
} from "@src/utils/apis/challenges";
import { GetServerSideProps } from "next";
import React from "react";

const ChallengeDetailPage = ({
  id,
  challengeDetails,
  challengeParticipants,
}) => {
  return (
    <ChallengeDetail
      challengeId={id}
      challengeDetails={challengeDetails}
      challengeParticipants={challengeParticipants}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const challengeId = Number(id);
  const challengeDetails = await getChallengeDetails(challengeId);
  const challengeParticipants = await getChallengeParticipants(
    challengeId,
    null,
    null,
    0,
    "",
    "USER_NAME",
    "ALL"
  );
  return {
    props: {
      id: challengeId,
      challengeDetails,
      challengeParticipants,
    },
  };
};

export default ChallengeDetailPage;
