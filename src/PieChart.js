import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "./App";
import { PieChart as Chart, Pie, Cell, Legend } from "recharts";
import "./PieChart.css";
const COLORS = ["#A000FF", "#FF9304", "#FDE006"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChart = () => {
  const { chartData } = useContext(ExpenseContext);

  return (
    <div>
      <Chart width={300} height={250} className="pie">
        <Pie
          data={chartData}
          cx={130}
          cy={130}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={85}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" iconSize="15" iconType="rect" />
      </Chart>
    </div>
  );
};

export default PieChart;
