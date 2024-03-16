import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({ data, selectedColumn }) => {
  const monthlyData = data.reduce((acc, item) => {
    const date = new Date(item.time);
    const month = date.getMonth();
    const value = parseFloat(item[selectedColumn.slice(1)]);
    console.log("value : ",value)
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(value);
    return acc;
  }, {});

  const avgMonthlyData = Object.values(monthlyData).map((values) =>
    values.reduce((a, b) => a + b, 0) / values.length
  );

  const option = {
    xAxis: {
      type: 'category',
      data: Array.from({ length: 12 }, (_, i) => i + 1)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: avgMonthlyData
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default BarChart;
