// TotalRescuesBySpeciesChart.js

import React from "react";
import { useQuery } from "react-query";
import { fetchTotalRescuesBySpecies } from "../../services/analytics_service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { handleLogout } from "../../global/function.global";

const TotalRescuesBySpeciesChart = () => {
  const AUTH_TOKEN = localStorage.getItem("auth_token");
  const USER_ID = localStorage.getItem("user_id");

  const { data, error, isLoading } = useQuery("totalRescuesBySpecies", () =>
    fetchTotalRescuesBySpecies(AUTH_TOKEN)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    handleLogout();
    return <p>Error: {error.message}</p>;
  }

  const chartData = data?.data?.map((entry, index) => ({
    species: entry.species,
    totalRescues: entry.total_rescues,
  }));

  return (
    <div>
      <div className="cs-dis-flex cs-hrz-center cs-bm-20">
        <h2>Total Rescues by Species</h2>
      </div>
      <BarChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="species" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalRescues" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TotalRescuesBySpeciesChart;
