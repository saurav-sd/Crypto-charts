import React from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ data, selectedColumn }) => {

  // console.log("selectedColumn : ", selectedColumn)
  // console.log("LineChart Data : ", data)

  // var timestamps = data.map(item => parseFloat(item["Unix Timestamp"]));
  const timestamps = data.map(item => new Date(parseFloat(item["Unix Timestamp"])));
  console.log("Timestamps : ", timestamps);

  const chartData = data.map((item) => ({
    date: new Date(item.Date),
    value: parseFloat(item[selectedColumn.slice(1)])
  }));

  console.log("Chart data : ", chartData);

  const option = {
    xAxis: {
      type: 'time', // ??
      // data: timestamps.map(ts => new Date(ts).toLocaleString()),
      // axisLabel: {
      //   formatter: function (value, index) {
      //     // Customize the formatting of the x-axis labels here
      //     return new Date(value).toLocaleString(); // Example: Format timestamps to locale string
      //   }
      // }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: chartData.map(({ date, value }) => [date, value])
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

export default LineChart;
