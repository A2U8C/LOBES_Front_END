import React from "react";
// Bug, Name clash
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Box, Paper, Typography } from "@mui/material";

function CustomeBarChart({ chartData, name, xlabel, ylable }) {
  const labels = chartData.map((data) => data.label);
  const dataValues = chartData.map((data) => data.value);

  const chartOptions = {
    // Add chart options here if needed
    scales: {
      y: {
        title: {
          display: ylable ? true : false,
          text: ylable ? ylable : "",
        },
      },

      x: {
        title: {
          display: xlabel ? true : false,
          text: xlabel ? xlabel : "",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // const colors = [
  //   "#FF6B6B", // Light Red
  //   "#FF9F9F", // Pale Red
  //   "#FFCC5C", // Mustard
  //   "#FFE66D", // Yellow
  //   "#88D8B0", // Light Green
  //   "#5DAB8B", // Muted Green
  //   "#6B7BD6", // Lavender
  //   "#A78BFA", // Light Purple
  //   "#FF7AE6", // Pink
  //   "#82AAFF", // Sky Blue
  //   "#5C7AEA", // Cerulean Blue
  //   "#2E3440", // Charcoal
  // ];

  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const data = {
    labels: labels,
    datasets: [
      {
        label: name,
        data: dataValues,
        // backgroundColor: randomColor,
        // borderColor: randomColor.replace(0.6, 1), // Adjust border color if needed
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={chartOptions} />;
}

export default CustomeBarChart;
