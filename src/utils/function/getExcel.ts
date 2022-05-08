import xlsx from "xlsx";
import { AuthorityType } from "../interfaces/auth";

export interface excelData {
  name: string;
  grade: number | null;
  class_num: number | null;
  number: number | null;
  all_walk_count: number;
  average_walk_count: number;
  all_distance: number;
  average_distance: number;
  authority: AuthorityType;
  school_nane: string;
}

export interface ChallengeExelData {
  name: string;
  school_name: string;
  grade: number;
  class_num: number;
  number: number;
  total_value: number;
  progress: number;
  is_success: boolean;
  success_date: string;
}

type ExelType = "CLASS" | "CHALLENGE";

const getExcel = (
  jsonData: excelData[] | ChallengeExelData[],
  exelType: ExelType
) => {
  const ws = xlsx.utils.json_to_sheet(jsonData);
  const wb = xlsx.utils.book_new();
  const firstCell =
    exelType === "CHALLENGE" ? challengeFirstCell : classFirstCell;
  firstCell.forEach((x, idx) => {
    const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
    ws[cellAdd].v = x;
  });

  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

  xlsx.writeFile(wb, "Test.xlsx");
};

export default getExcel;

const classFirstCell = [
  "이름",
  "학년",
  "반",
  "번호",
  "총걸음수",
  "평균걸음수",
  "총이동거리",
  "평균이동거리",
  "권한",
  "학교",
];

const challengeFirstCell = [
  "이름",
  "학교",
  "학년",
  "반",
  "번호",
  "진행상황",
  "진행도",
  "성공여부",
  "완료일",
];
