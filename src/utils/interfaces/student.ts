export interface StudentType {
  user_id: number;
  name: string;
  profile_image_url: string;
  grade: number | null; //선생님이면 null 가능
  class_num: number | null; //선생님이면 null 가능
  number: number | null; //선생님이면 null 가능
  average_walk_count: number;
  total_walk_count: number;
  average_distance: number;
  total_distance: number;
  is_teacher: boolean;
}
