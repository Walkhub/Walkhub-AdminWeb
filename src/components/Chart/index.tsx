import React, { FC, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useChartData from '../../hooks/useChartData';

interface Props {
    countList: number[]
}

const Chart: FC<Props> = ({countList}) => {
    const chartData = useChartData(countList)

    return (
        <>
        {
            <LineChart width={460} height={230} data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="1" vertical={false}/>
                <XAxis dataKey="date" padding={{left: 20, right: 20}} interval={chartData.length > 10 ? 2 : 0}/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#4D99F0" dot={false}/>
            </LineChart>
        }
        </>
    );
}

export default Chart