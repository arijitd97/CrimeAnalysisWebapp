import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'

export const LineChartRaceOffenseType = ({ chartData }) => {
  return (

<div>
    <div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of crimes(per million people) for different races vs Period of time"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
    
</div>
  );
};