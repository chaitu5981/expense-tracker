import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "./TopExpenses.css";
import { ExpenseContext } from "./App";
const TopExpenses = () => {
  const { chartData } = useContext(ExpenseContext);
  return (
    <div className="top-expenses">
      <h3>Top Expenses</h3>
      <div className="bar-chart">
        <ResponsiveContainer width="100%" height={300} style={{ display : "flex", justifyContent: "center" }}>
          <BarChart
            width="70%"
            height={300}
            layout="vertical"
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={200} />
            <Bar
              barSize={30}
              dataKey="value"
              fill="#8884d8"
              radius={[0, 12, 12, 0]}
            />
          </BarChart>
                </ResponsiveContainer>
        
      </div>
    </div>
  );
};

export default TopExpenses;
