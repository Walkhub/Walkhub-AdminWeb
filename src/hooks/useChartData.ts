const useChartData = (data: number[]) => {
    const chartData: { date: string; count: number }[] = []
    data.map((i: number, idx) => {
        const now = new Date()
        const chartDate = new Date(now.setDate(now.getDate() - (data.length-idx-1)));
        console.log(chartDate.getMonth(), chartDate.getDate())
        chartData.push(
        {
            date: `${chartDate.getMonth()+1}/${chartDate.getDate()}`,
            count: i
        })
    })
    
    return chartData
}

export default useChartData;