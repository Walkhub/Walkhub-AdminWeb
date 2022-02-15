const getChartData = (data: number[]) => {
  const chartData: { date: string; count: number; color: number }[] = [];
  data.map((i: number, idx) => {
    const now = new Date();
    const chartDate = new Date(
      now.setDate(now.getDate() - (data.length - idx - 1))
    );

    chartData.push({
      date: `${chartDate.getMonth() + 1}/${chartDate.getDate()}`,
      count: data[i],
      color: getWeek(chartDate),
    });
  });

  return chartData;
};

function getWeek(paramDate: Date) {
  const day = paramDate.getDay();
  const diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
  return Math.ceil(diff / 7);
}

export default getChartData;
