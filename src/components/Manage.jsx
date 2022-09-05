import React from "react";
import Chart from "react-apexcharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import '../styles/manage.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Groceries", "Bill", "Entertainment", "Insurance & EMIs", "Education", "Shopping", "Household Needs", "Others"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 23, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(10, 102, 25, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(10, 102, 25, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1
    }
  ]
};

const Manage = () => {
  return (
    <>
      <div className="mouse600 page-headings flexy mt-4 mb-3">Manage</div>
      <div className="p-4">
        <Doughnut
          className="graph-holder mouse400"
          height={300}
          width={400}
          data={data}
          options={{
            responsive: true
          }}
        />
      </div>
    </>
  );
};

export default Manage;