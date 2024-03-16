import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ data, selectedColumn }) => {
  const chartData = data.map((item) => ({
    date: new Date(item.time),
    value: parseFloat(item[selectedColumn.slice(1)])
  }));

  const option = {
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: chartData.map(({ date, value }) => [date, value])
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default LineChart;
