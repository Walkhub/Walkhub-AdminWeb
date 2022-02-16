import instance from "@src/utils/axios";

interface ChallangeType {
  name: string;
  content: string;
  image_url: string;
  start_at: string;
  end_at: string;
  award: string;
  user_scope: string;
  goal_scope: string;
  goal_type: string;
  goal: number;
  success_standard: number;
  challenge_id?: number;
}

export const createChallenge = async (challengesRequest: ChallangeType) => {
  try {
    await instance.post("/challenges", challengesRequest);
  } catch (error) {
    throw error;
  }
};

export const changeChallenge = async (challengesRequest: ChallangeType) => {
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
