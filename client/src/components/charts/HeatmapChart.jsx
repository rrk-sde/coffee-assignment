import React from 'react';
import ApexCharts from 'react-apexcharts';

const HeatmapChart = ({ data }) => {
  console.log(data);

  const options = {
    xaxis: {
      categories: data.map(item => item.start_year),
    },
    yaxis: {
      categories: data.map(item => item.topic),
    },
  };

  const series = [
    {
      name: 'Intensity',
      data: data.map(item => ({
        x: item.start_year,
        y: item.topic,
        value: item.intensity,
      })),
    },
  ];

  console.log(options);
  console.log(series);

  return (
    <div>
      <h2>Heatmap Chart</h2>
      <ApexCharts
        options={options}
        series={series}
        type="heatmap"
        height={300}
      />
    </div>
  );
};

export default HeatmapChart;
