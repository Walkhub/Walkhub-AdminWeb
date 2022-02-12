import React, { FC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Cell,
} from "recharts";
import useChartData from "../../hooks/useChartData";

interface Props {
  countList: number[];
}

const colors: string[] = [
  "#7800BC",
  "#06BC00",
  "#F1B957",
  "#F157AE",
  "#57B4F1",
];

const chart: FC<Props> = ({ countList }) => {
  const chartData = useChartData(countList);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {
        <BarChart
          width={460}
          height={230}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='1' vertical={false} />
          <XAxis
            dataKey='date'
            padding={{ left: 20, right: 20 }}
            interval={chartData.length > 10 ? 2 : 0}
          />
          <YAxis />
          <Tooltip
            content={
              <CustomTooltip
                active={undefined}
                payload={undefined}
                label={undefined}
              />
            }
          />
          <Bar dataKey='count' fill='#ffffff'>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartData.length > 8 ? colors[entry.color] : "#57B4F1"}
              />
            ))}
          </Bar>
        </BarChart>
      }
    </>
  );
};

export default chart;
