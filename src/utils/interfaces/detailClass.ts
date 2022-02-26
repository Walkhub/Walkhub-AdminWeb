export interface DetailClassType {
  class_cord: string;
  teacher: {
    user_id: number;
    name: string;
    profile_image_url: string;
  };
  user_List: {
    user_id: number;
    name: string;
    profile_image_url: string;
    number: number;
    average_walk_count: number;
    total_walk_count: number;
    average_distance: number;
    total_distance: number;
  };
}
