import Chart from 'react-apexcharts';

type Props = {
  priceHistory: { timestamp: number; price: number }[];
  height?: number;
  width?: number;
  ymin?: number;
  ymax?: number;
};

/**
 * LineChartの使い方は<https://apexcharts.com/react-chart-demos/line-charts/basic/>を参照。
 */
export const LineChart = (props: Props) => {
  const { priceHistory, height, width, ymin, ymax } = props;
  const data: [number, number][] = priceHistory.map(({ timestamp, price }) => [timestamp, price]);
  return (
    <>
      <Chart
        height={height}
        width={width}
        series={[{ data }]}
        options={{
          stroke: { curve: 'smooth' },
          grid: { padding: { right: 30, left: 20 } },
          xaxis: { type: 'datetime', labels: { datetimeUTC: false } },
          yaxis: { min: ymin, max: ymax },
        }}
      />
    </>
  );
};
