import { css } from '@emotion/react';
import { ResponsiveLine } from '@nivo/line';

const containerCss = css`
  width: 100%;
  height: 45%;
`;

interface LineChartProps {
  data: any;
  chartColors: string[];
}

function LineChart(props: LineChartProps) {
  const { data, chartColors } = props;

  return (
    <div css={containerCss}>
      <ResponsiveLine
        data={data}
        colors={chartColors}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
      />
    </div>
  );
}

export { LineChart };
