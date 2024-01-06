// MostFrequentProblemTypesChart.js

import React from "react";
import { useQuery } from "react-query";
import { fetchMostFrequentProblemTypes } from "../../services/analytics_service";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6B81"];

const MostFrequentProblemTypesChart = () => {
  const AUTH_TOKEN = localStorage.getItem("auth_token");
  const USER_ID = localStorage.getItem("user_id");

  const { data, error, isLoading } = useQuery("mostFrequentProblemTypes", () =>
    fetchMostFrequentProblemTypes(AUTH_TOKEN)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const chartData = data?.data?.map((entry, index) => ({
    name: entry.problem_type,
    value: entry.total_cases,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <div className="cs-dis-flex cs-hrz-center cs-bm-20">
        <h2>Most Frequent Problem Types</h2>
      </div>
      <PieChart width={600} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MostFrequentProblemTypesChart;
