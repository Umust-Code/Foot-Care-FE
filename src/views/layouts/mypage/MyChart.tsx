import { useQuery } from '@tanstack/react-query';
import { getSurveyData } from 'api/requests/requestSurvey';
import { css } from '@emotion/react';
import { LineChart } from 'views/components/Chart/LineChart';
import { transformChartData } from './converter';
import { useUserInfoStore } from 'stores/userStore';

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
      d4: 4,
      d5: 3,
      d6: 3,
      d1: 2,
      d2: 1,
      d3: 1,
    },
  ];
  const convertData = transformChartData(surveyData.data);

  return <>{surveyData.isLoading ? <div>Loading...</div> : <LineChart data={convertData} />}</>;
}

export { MyChart };
