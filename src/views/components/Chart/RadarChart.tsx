import { ResponsiveRadar } from '@nivo/radar';

const RadarChart = ({ data }: { data: any }) => (
  <ResponsiveRadar
    data={data}
    keys={['점수']}
    indexBy="name"
    margin={{ top: 10, right: 80, bottom: 10, left: 80 }}
    borderColor={{ from: 'color' }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    colors={{ scheme: 'paired' }}
    blendMode="multiply"
    animate={false}
  />
);

export { RadarChart };
