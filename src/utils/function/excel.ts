import xlsx from "xlsx";

interface excelData {
  name: string;
  grade: number | null;
  class_num: number | null;
  number: number | null;
  all_walk_count: number;
  average_walk_count: number;
  all_distance: number;
  average_distance: number;
  authority: string;
  school_nane: string;
}

const getExcel = (jsonData: excelData[]) => {
  const ws = xlsx.utils.json_to_sheet(jsonData);

  const wb = xlsx.utils.book_new();

  firstCell.forEach((x, idx) => {
    const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
    ws[cellAdd].v = x;
  });

  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

  xlsx.writeFile(wb, "Test.xlsx");
};

export default getExcel;

const firstCell = [
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
