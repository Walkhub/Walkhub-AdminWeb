const useChartData = (data: number[]) => {
    const chartData: { date: string; count: number }[] = []
    const today = new Date()

    data.map((i: number, idx) => chartData.push(
        {
            date: `${today.getMonth() + 1} / ${today.getDate() - (6-idx)}`,
            count: i
        })
    )
    
    return chartData
}

export default useChartData;