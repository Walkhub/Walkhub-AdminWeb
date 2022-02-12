const useChartData = (data: number[]) => {
  const chartData: { date: string; count: number; color: number }[] = [];
  let colorIndex = 0;
  data.map((i: number, idx) => {
    const now = new Date();
    const chartDate = new Date(
      now.setDate(now.getDate() - (data.length - idx - 1))
    );
    if (chartDate.getDay() === 1) colorIndex++;
    chartData.push({
      date: `${chartDate.getMonth() + 1}/${chartDate.getDate()}`,
      count: i,
      color: colorIndex,
    });
  });

  return chartData;
};

export default useChartData;
