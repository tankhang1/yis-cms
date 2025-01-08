import React from "react";
import merge from "deepmerge";
import Chart from "react-apexcharts";

type PropTypes = {
  height?: number;
  series: number[];
  colors?: string | string[];
  labels?: string[];
  options?: object;
};

const AppPieChart = ({
  height = 350,
  series,
  colors,
  labels,
  options,
}: PropTypes) => {
  const chartOptions = React.useMemo(
    () => ({
      colors,
      labels,
      ...merge(
        {
          chart: {
            type: "donut",
            height: height,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
        },
        options ? options : {}
      ),
    }),
    [height, colors, labels, options]
  );
  return (
    <Chart
      height={height}
      type="pie"
      series={series}
      options={chartOptions as unknown as ApexCharts.ApexOptions}
    />
  );
};

export default AppPieChart;
