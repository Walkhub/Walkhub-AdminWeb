export interface TeacherType {
  user_count: number;
  section: {
    section_id: number | null;
    grade: number | null;
    class_num: number | null;
  };
  teacher: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
}
