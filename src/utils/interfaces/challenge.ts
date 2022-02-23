export interface ChallengeType {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
  image_url: string;
  user_scope: string;
  goal_scope: string;
  goal_type: string;
  writer: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
}
