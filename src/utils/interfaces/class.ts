export interface ClassType {
  user_count: number;
  section: {
    section_id: number;
    grade: number;
    class_num: number;
  };
  teacher: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
}

export interface DetailClassType {
  grade: number;
  class_num: number;
  class_code: string;
  teacher: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
}
