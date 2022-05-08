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
  image_url: string | null;
  start_at: string;
  end_at: string;
  award: string;
  user_scope: userScopeType;
  goal: number | null;
  goal_type: goalType | null;
  goal_scope: goalScopeType | null;
  success_standard: number | null;
  challenge_id?: number;
}

export interface userResponseType {
  user_id: number;
  name: string;
  grade: number | null;
  class_num: number | null;
  number: number | null;
  school_name: string;
  profile_image_url: string;
  total_value: number;
  progress: number;
  is_success: boolean;
  success_date: string | null;
}

export interface ChallengeParticipantsType {
  total_page: number;
  participant_list: userResponseType[];
}

export interface ChallengeDetailsType {
  school_name: string | null;
  name: string;
  content: string;
  image_url: string;
  award: string;
  start_at: string;
  end_at: string;
  goal: number;
  goal_scope: goalScopeType;
  goal_type: goalType;
  user_scope: userScopeType;
  class_num: number | null;
  grade: number | null;
  success_standard: number;
  is_mine: boolean;
  writer: {
    user_id: number;
    name: string;
    profile_image_url: string | null;
  };
}
