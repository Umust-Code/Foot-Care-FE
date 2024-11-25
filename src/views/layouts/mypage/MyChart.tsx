import { useQuery } from '@tanstack/react-query';
import { getSurveyData } from 'api/requests/requestSurvey';
import { css } from '@emotion/react';
import { LineChart } from 'views/components/Chart/LineChart';
import { transformChartData } from './converter';
import { useUserInfoStore } from 'stores/userStore';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  align-items: center;
  gap: 10px;
`;

function MyChart() {
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
      date: '2024-11-13',
      d4: 6,
      d5: 5,
      d6: 7,
      d1: 5,
      d2: 4,
      d3: 2,
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
  ];
  const convertData = transformChartData(surveyData.data);
  // const convertData = transformChartData(sampleData);

  return (
    <div css={containerCss}>
      {surveyData.isLoading ? <div>Loading...</div> : <LineChart data={convertData} />}
      {/* <LineChart data={convertData} /> */}
    </div>
  );
}

export { MyChart };
