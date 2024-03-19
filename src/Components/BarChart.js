import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({ data, selectedColumn }) => {

  const monthlyData = data.reduce((acc, item) => {
    const date = new Date(item.Date);
    console.log("date : ", date);
    const month = date.getMonth();
    console.log("Month : ",month)
    const value = parseFloat(item[selectedColumn.slice(1)]);
    console.log("BarChart value : ",value)
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(value);
    return acc;
  }, {});

  console.log("monthlyData : ",monthlyData)

  const monthNames = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return date.toLocaleString('en-US', { month: 'long' });
});

  const avgMonthlyData = Object.values(monthlyData).map((values) =>
    values.reduce((a, b) => a + b, 0) / values.length
  );

  console.log("avgMonthlyData : ",avgMonthlyData)

  const option = {
    xAxis: {
      type: 'category',
      data: monthNames,
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
