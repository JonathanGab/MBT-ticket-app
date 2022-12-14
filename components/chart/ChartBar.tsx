import { Dimensions } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import dayjs from 'dayjs';

export default function ChartBar() {
  const width = Dimensions.get('window').width;
  const height = 220;

  const data = {
    labels: Array.from({ length: 12 }, (_, i: number) =>
      dayjs().month(i).format('MMM')
    ),
    datasets: [
      {
        data: [0, 1, 2],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(85, 125, 107, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };
  const graphStyle = {
    marginVertical: 8,
    ...chartConfig,
  };
  return (
    <>
      <BarChart
        width={width}
        height={height}
        data={data}
        chartConfig={chartConfig}
        style={graphStyle}
        yAxisLabel=""
        yAxisSuffix=""
      />
    </>
  );
}
