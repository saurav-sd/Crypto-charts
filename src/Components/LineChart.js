import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ data, selectedColumn }) => {

  const chartData = data.map((item) => ({
    date: new Date(item.Date),
    value: parseFloat(item[selectedColumn.slice(1)])
  }));

  const option = {
    xAxis: {
      type: 'time', // Use type 'time' for continuous behavior
      // minInterval: 1000 * 3600 * 24 * 30, // Set the minimum interval to display as one month
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: chartData.map(({ value }) => value),
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default LineChart;
