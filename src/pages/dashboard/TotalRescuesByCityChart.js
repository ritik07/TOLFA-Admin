// TotalRescuesByCityChart.js

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchTotalRescuesByCity } from "../../services/analytics_service";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TotalRescuesByCityChart = () => {
  const AUTH_TOKEN = localStorage.getItem("auth_token");

  // Use React.useEffect to fetch data only once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const { data, error, isLoading } = useQuery("totalRescuesByCity", fetchData);

  function fetchData() {
    return fetchTotalRescuesByCity(AUTH_TOKEN);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const chartData = data?.data?.map((entry) => ({
    city: entry.city,
    totalRescues: entry.total_rescues,
  }));

  // Define an array of colors for each slice
  const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c"];

  return (
    <div>
      <div className="cs-dis-flex cs-hrz-center cs-bm-20">
        <h2>Total Rescues by City</h2>
      </div>
      <PieChart width={600} height={400}>
        <Pie
          data={chartData}
          dataKey="totalRescues"
          nameKey="city"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieColors[index % pieColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TotalRescuesByCityChart;
