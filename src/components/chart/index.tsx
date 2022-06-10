/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Cell,
  TooltipProps,
} from "@walkhub/recharts";

import {
  ValueType,
  NameType,
} from "@walkhub/recharts/src/component/DefaultTooltipContent";
import getChartData from "../../utils/function/getChartData";
import { cp } from "fs/promises";
import dayjs from "dayjs";

interface Props {
  countList: number[];
  endAt: dayjs.Dayjs;
}

const colors: string[] = [
  "#7800BC",
  "#06BC00",
  "#F1B957",
  "#F157AE",
  "#57B4F1",
];

const chart: FC<Props> = ({ countList, endAt }) => {
  const chartData = getChartData(countList, endAt).reverse();
  const CustomTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
    if (payload && payload.length) {
      return (
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: "#ffffff",
            padding: "4px 12px",
            borderRadius: "4px",
          }}
        >
          <p className='label'>{payload[0].value}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {
        <BarChart
          width={520}
          height={230}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='1' vertical={false} />
          <XAxis
            dataKey='date'
            padding={{ left: 20, right: 20 }}
            interval={chartData.length > 7 ? 2 : 0}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey='count'
            fill='#ffffff'
            barSize={12}
            radius={[25, 25, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  chartData.length > 8 ? colors[entry.color % 5] : "#57B4F1"
                }
              />
            ))}
          </Bar>
        </BarChart>
      }
    </>
  );
};

export default chart;
