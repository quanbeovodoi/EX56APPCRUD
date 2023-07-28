import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);
const DataOrigin = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];
  
function LineChart() {
    const [chartData, setChartData] = useState({
        labels: DataOrigin.map((data) => data.year), 
        datasets: [
          {
            label: "Doanh thu",
            data: DataOrigin.map((data) => data.userGain),
            borderColor: "blue",
            borderWidth: 2
          }
        ]
      });
    return ( <>
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Doanh Thu</h2>
      <Line
        data={chartData}
        options={
        {
            plugins: {
                legend: {
                display: false
                }
            }
        }}
      />
    </div>
    </> );
}

export default LineChart;