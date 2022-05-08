import instance from "@src/utils/axios";
import {
  ChallengeContentType,
  ChallengeDetailsType,
  ChallengeParticipantsType,
} from "@src/utils/interfaces/challenge";
import {
  participantSortType,
  participantsScopeType,
} from "@src/components/common/search/options";

interface CreateResponse {
  challenge_id: number;
}

export const createChallenge = async (
  challengesRequest: ChallengeContentType
): Promise<CreateResponse> => {
  try {
    const response = await instance.post("/challenges", challengesRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeChallenge = async (
  challengesRequest: ChallengeContentType
): Promise<CreateResponse> => {
  try {
    const response = await instance.patch(
      `/challenges/${challengesRequest.challenge_id}`,
      challengesRequest
    );
    return response.data;
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
    const response = await instance.get(`/challenges/web/${challenge_id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getChallengeParticipants = async (
  challenge_id: number,
  grade: number | null,
  classNum: number | null,
  size: number,
  name: string | null,
  sort: participantSortType,
  userScope: participantsScopeType
): Promise<ChallengeParticipantsType> => {
  try {
    const response = await instance.get(
      `/challenges/${challenge_id}/progress?sort=${sort}&userScope=${userScope}&page=${size}${
        name ? `&name=${name}` : ""
      }${grade ? `&grade=${grade}` : ""}${
        classNum ? `&classNum=${classNum}` : ""
      }`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
