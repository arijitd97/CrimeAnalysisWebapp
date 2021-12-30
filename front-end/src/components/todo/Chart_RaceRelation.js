import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'

export const LineChartRaceRelation = ({ chartData }) => {
  return (

<div>
    <div>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of Crimes (per million) in family of different races VS Period of time"
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