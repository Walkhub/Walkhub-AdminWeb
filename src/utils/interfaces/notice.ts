export interface NoticeType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  scope: string;
  writer: {
    id: string;
    name: string;
    profile_image_url: string;
  };
}
