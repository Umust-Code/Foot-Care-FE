import { Tabs } from 'antd';
import { css } from '@emotion/react';
import { MyLineChart } from './MyLineChart';
import { MyRadarChart } from './MyRadarChart';
import { BackButton } from 'views/components/Button/BackButton';
import { useQuery } from '@tanstack/react-query';
import { getSurveyData } from 'api/requests/requestSurvey';
import { useUserInfoStore } from 'stores/userStore';
import { Header } from 'views/layouts/Header';

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

const tabContentCss = css`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MyFootCare() {
  const { userInfo } = useUserInfoStore();

  const surveyData = useQuery({
    queryKey: ['surveyData', userInfo.memberId],
    queryFn: () => getSurveyData(userInfo.memberId),
  });

  const sampleData = {
    data: [
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
    ],
  };

  const items = [
    {
      key: '1',
      label: '전체 통계',
      children: (
        <div css={tabContentCss}>
          <MyRadarChart surveyData={surveyData.data} />
        </div>
      ),
    },
    {
      key: '2',
      label: '날짜별 통계',
      children: (
        <div css={tabContentCss}>
          <MyLineChart surveyData={surveyData.data} />
        </div>
      ),
    },
  ];

  return (
    <div css={containerCss}>
      <Header title="나의 풋케어" />
      <Tabs defaultActiveKey="1" items={items} style={{ width: '100%' }} />
    </div>
  );
}

export { MyFootCare };
