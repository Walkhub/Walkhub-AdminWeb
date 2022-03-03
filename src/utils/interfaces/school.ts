export interface SchoolType {
  school_id: number;
  school_name: string;
  ranking: number;
  logo_image_url: string;
  walk_count: number;
}

export interface SchoolListType {
  school_list: SchoolType[];
}
