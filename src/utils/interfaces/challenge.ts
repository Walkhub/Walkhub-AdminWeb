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

export type userScopeType = "ALL" | "SCHOOL" | "GRADE" | "CLASS";
export type gradeType = "1" | "2" | "3" | "4" | "5" | "6";
export type goalType = "WALK" | "DISTANCE";
export type goalScopeType = "ALL" | "DAY";

export interface ChallengeContentType {
  name: string;
  content: string;
  image_url: string;
  start_at: string;
  end_at: string;
  award: string;
  user_scope: userScopeType;
  goal: number | null;
  goal_type: goalType | null;
  goal_scope: goalScopeType | null;
  success_standard: number | null;
  grade: number | null;
}