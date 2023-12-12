import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Pie } from "react-chartjs-2";

function CustomPieChart({ chartData, name }) {
  const labels = chartData.map((data) => data.label);
  const dataValues = chartData.map((data) => data.value);

  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  ChartJS.defaults.plugins.legend.position = "top";

  const data = {
    labels: labels,
    datasets: [{ label: name, data: dataValues }],
  };
  return <Pie data={data} options={chartOptions} />;
}

export default CustomPieChart;
