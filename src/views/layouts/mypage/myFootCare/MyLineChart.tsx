import { LineChart } from 'views/components/Chart/LineChart';
import { transformChartData, calculateDiseaseAverages } from 'views/layouts/mypage/converter';
import { css } from '@emotion/react';

const legendContainerCss = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin: 10px 0 10px 10px;
`;

const legendItemCss = css`
  display: flex;
  align-items: center;
  line-height: 18px;
  gap: 8px;
`;

const colorBoxCss = (color: string) => css`
  width: 12px;
  height: 12px;
  background-color: ${color};
  border-radius: 2px;
`;

const CHART_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
const DISEASE_NAMES = [
  '족저근막염',
  '발부종',
  '당뇨병성 발',
  '발 뒤꿈치 통증',
  '무좀(발냄새)',
  '발목 염좌',
];

function MyLineChart({ surveyData }: { surveyData: any }) {
  const convertData = transformChartData(surveyData);
  const averages = calculateDiseaseAverages(surveyData);
  return (
    <>
      {/* {surveyData.isLoading ? (
        <div>Loading...</div>
      ) : (
        <> */}
      <LineChart data={convertData} chartColors={CHART_COLORS} />
      <div css={legendContainerCss}>
        {averages.map((item, index) => (
          <div key={index} css={legendItemCss}>
            <div css={colorBoxCss(CHART_COLORS[index])} />
            <span>
              {item.name} - {item.status}
            </span>
          </div>
        ))}
      </div>
      {/* </>
      )} */}
    </>
  );
}

export { MyLineChart };
