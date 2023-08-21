/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartComponent({ DailyList }) {
  const data = DailyList.map((dailyEntry) => {
    return {
      mood: dailyEntry.mood,
      date: dailyEntry.date,
    };
  });

  const moodLabels = [...new Set(data.map((item) => item.mood))];

  const labels = data.map((item) => item.date);

  const options = {
    maintainAspectRatio: false,
    fill: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Tendencias",
      },
      tooltip: {
        callbacks: {
          label: (context) => moodLabels[context.parsed.y - 1], // Display mood label in tooltip
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: (value) => moodLabels[value - 1], // Use moodLabels as Y-axis labels
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Estados de animo",
        data: data.map((item) => moodLabels.indexOf(item.mood) + 1),
        borderColor: "#9448bc",
        backgroundColor: "rgba(148, 72, 188, 0.5)",
        fill: true,
      },
      // Add more datasets for other emotions
    ],
  };

  return (
    <div className='chartContainer'>
      <Card id='card'>
        <Line options={options} data={chartData} />
      </Card>
    </div>
  );
}
