import { AuthorityType } from "@src/utils/interfaces/auth";

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
  grade: number | null;
  challenge_id?: number;
}

export interface userResponseType {
  user_id: number;
  user_name: string;
  grade: number | null;
  class_num: number | null;
  number: number | null;
  school_name: string;
  profile_image_url: string;
  total_walk_count: number;
  progress: number;
  is_success: boolean;
  success_date: string | null;
}

export interface ChallengeParticipantsType {
  name: string;
  user_id: number;
  content: string;
  image_url: string;
  writer_name: string;
  writer_profile_image_url: null | string;
  award: string;
  start_at: string;
  end_at: string;
  goal: number;
  goal_scope: goalScopeType;
  user_scope: userScopeType;
  goal_type: goalType;
  class_num: number | null;
  grade: number | null;
  success_standard: number;
  participant_count: number;
  is_mine: boolean;
  is_participated: boolean;
  user_response: userResponseType[];
}

export interface ChallengeDetailsType {
  name: string;
  user_id: number;
  content: string;
  image_url: string;
  award: string;
  start_at: string;
  end_at: string;
  goal: number;
  goal_scope: goalScopeType;
  user_scope: userScopeType;
  goal_type: goalType;
  success_standard: number;
  participant_count: number;
  is_mine: boolean;
  is_participated: boolean;
  writer: {
    user_id: number;
    name: string;
    profile_image_url: string | null;
    authority: AuthorityType;
    school_name: string;
    grade: number | null;
    class_num: number | null;
  };
}
