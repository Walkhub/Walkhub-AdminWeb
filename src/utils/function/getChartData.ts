import dayjs, { Dayjs } from "dayjs";

const getChartData = (data: number[], endAt: dayjs.Dayjs) => {
  return data.map((i: number, idx) => {
    const now = endAt;
    // const chartDate = new Date(
    //   now.setDate(now.getDate() - (data.length - idx - 1))
    // );
    const chartDate = endAt.add(data.length - idx - 1, "day");
    return {
      date: `${chartDate.get("month")}/${chartDate.get("date")}`,
      count: i,
      color: getWeek(chartDate),
    };
  });
};

function getWeek(paramDate: dayjs.Dayjs) {
  const day = paramDate.get("day");
  const diff = paramDate.get("date") - day + (day == 0 ? -6 : 1);
  return Math.ceil(diff / 7);
}

export default getChartData;
