import instance from "@src/utils/axios";
import {
  ChallengeContentType,
  ChallengeDetailsType,
  ChallengeParticipantsType,
} from "@src/utils/interfaces/challenge";
import {
  participantOrderType,
  participantsScopeType,
  successScopeType,
} from "@src/components/challengeDetail/search";

export const createChallenge = async (
  challengesRequest: ChallengeContentType
) => {
  try {
    await instance.post("/challenges", challengesRequest);
  } catch (error) {
    throw error;
  }
};

export const changeChallenge = async (
  challengesRequest: ChallengeContentType
) => {
  try {
    await instance.patch(
      `/challenges/${challengesRequest.challenge_id}`,
      challengesRequest
    );
  } catch (error) {
    throw error;
  }
};

export const deleteChallenge = async (challenge_id: number) => {
  try {
    await instance.delete(`/challenges/${challenge_id}`);
  } catch (error) {
    throw error;
  }
};

export const getChallengeDetails = async (
  challenge_id: number
): Promise<ChallengeDetailsType> => {
  try {
    const response = await instance.get(`/challenges/${challenge_id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getChallengeParticipants = async (
  challenge_id: number,
  successScope: successScopeType,
  page: number,
  participantsOrder: participantOrderType,
  participantsScope: participantsScopeType
): Promise<ChallengeParticipantsType> => {
  try {
    const response = await instance.get(
      `/challenges/${challenge_id}/progress?SuccessScope=${successScope}&page=${page}&participantsOrder=${participantsOrder}&participantsScope=${participantsScope}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
