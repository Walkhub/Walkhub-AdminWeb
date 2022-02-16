const getChartData = (data: number[]) => {
  return data.map((i: number, idx) => {
    const now = new Date();
    const chartDate = new Date(
      now.setDate(now.getDate() - (data.length - idx - 1))
    );
    return {
      date: `${chartDate.getMonth() + 1}/${chartDate.getDate()}`,
      count: i,
      color: getWeek(chartDate),
    };
  });
};

function getWeek(paramDate: Date) {
  const day = paramDate.getDay();
  const diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
  return Math.ceil(diff / 7);
}

export default getChartData;
