import { useQuery } from '@tanstack/react-query';
import { Tabs } from 'antd';
import { getSurveyData } from 'api/requests/requestSurvey';
import { css } from '@emotion/react';
import { LineChart } from 'views/components/Chart/LineChart';
import { transformChartData, calculateDiseaseAverages } from 'views/layouts/mypage/converter';
import { useUserInfoStore } from 'stores/userStore';
import { BackButton } from 'views/components/Button/BackButton';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  align-items: center;
  gap: 10px;
  overflow-x: hidden;
`;

const titleCss = css`
  font-size: 24px;
  font-family: 'Pretendard-Bold';
  margin-top: 15px;
`;

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

function MyFootCare() {
  const { userInfo } = useUserInfoStore();
  const surveyData = useQuery({
    queryKey: ['surveyData', userInfo.memberId],
    queryFn: () => getSurveyData(userInfo.memberId),
  });

  const sampleData = [
    {
      date: '2024-11-10',
      d4: 12,
      d5: 11,
      d6: 15,
      d1: 15,
      d2: 13,
      d3: 4,
    },
    {
      date: '2024-11-11',
      d4: 10,
      d5: 9,
      d6: 8,
      d1: 8,
      d2: 7,
      d3: 6,
    },
    {
      date: '2024-11-12',
      d4: 8,
      d5: 7,
      d6: 10,
      d1: 7,
      d2: 6,
      d3: 3,
    },
    {
      date: '2024-11-14',
      d4: 8,
      d5: 7,
      d6: 10,
      d1: 7,
      d2: 6,
      d3: 3,
    },
    {
      date: '2024-11-13',
      d4: 6,
      d5: 5,
      d6: 7,
      d1: 5,
      d2: 4,
      d3: 2,
    },
  ];
  // const convertData = transformChartData(surveyData.data);
  // const averages = calculateDiseaseAverages(surveyData.data);

  const convertData = transformChartData(sampleData);
  const averages = calculateDiseaseAverages(sampleData);

  const items = [
    {
      key: '1',
      label: '전체 통계',
      children: '내용1',
    },
    {
      key: '2',
      label: '날짜별 통계',
      children: '내용2',
    },
  ];

  return (
    <div css={containerCss}>
      <BackButton />
      <div css={titleCss}>나의 풋케어</div>
      <Tabs defaultActiveKey="1" items={items} />

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
    </div>
  );
}

export { MyFootCare };
