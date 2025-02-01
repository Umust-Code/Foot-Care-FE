import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getUserGender, getUserTotal, getUserMonthlySignup } from 'api/requests/requestAnalysis';
import { UserGender } from 'api/models/response';
import { BarChart } from 'views/components/Chart/BarChart';
import { PieChart } from 'views/components/Chart/PieChart';

const headerContainerCss = css`
  display: flex;
  font-size: 16px;
  height: 26px;
  margin-left: 5px;
  align-items: center;
  margin-bottom: 5px;
  font-family: 'pretendard-bold';
`;

const containerCss = css`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const chartContainerCss = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  row-gap: 30px;
  flex-wrap: wrap;
  width: 100%;
`;

const barChartCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 50%;
  height: 240px;
`;

const pieChartCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 30%;
  height: 240px;
`;

const chartTitleCss = css`
  font-size: 24px;
  font-family: 'pretendard-Medium';
`;

function AdminUserDataPanel() {
  const userGender = useQuery<UserGender, Error>({
    queryKey: ['userGender'],
    queryFn: () => getUserGender(),
  });

  const convertGenderData = (genderCount: UserGender | undefined) => {
    if (!genderCount) return [];
    return [
      {
        id: '여성',
        label: '여성',
        value: genderCount.F,
      },
      {
        id: '남성',
        label: '남성',
        value: genderCount.M,
      },
    ];
  };

  const userTotal = useQuery<number, Error>({
    queryKey: ['userTotal'],
    queryFn: () => getUserTotal(),
  });

  const userMonthlySignup = useQuery<number, Error>({
    queryKey: ['userMonthlySignup'],
    queryFn: () => getUserMonthlySignup(),
  });

  const convertMonthlySignupData = (monthlyData: any) => {
    if (!monthlyData) return [];
    return Object.entries(monthlyData).map(([time, count]) => ({
      time,
      count,
    }));
  };

  // const sampleGender = {
  //   F: 3,
  //   M: 2,
  // };

  // const sampleTotal = 10;

  // const sampleMonthlySignup = {
  //   '2025-01': 3,
  //   '2024-01': 1,
  //   '2023-01': 3,
  //   '2022-01': 1,
  //   '2021-01': 3,
  //   '2020-01': 1,
  // };

  return (
    <>
      <div css={headerContainerCss}>사용자 통계</div>
      <div css={containerCss}>
        <div css={chartContainerCss}>
          <div css={barChartCss}>
            <div css={chartTitleCss}>전체 사용자: {userTotal.data || 0}명</div>
            <BarChart
              data={convertMonthlySignupData(userMonthlySignup.data) || []}
              legend="인원수"
              keys={['count']}
              indexBy="time"
              colors="#5388d8b0"
            />
          </div>
          <div css={pieChartCss}>
            <div css={chartTitleCss}>성별</div>
            <PieChart data={convertGenderData(userGender.data) || []} />
          </div>
        </div>
      </div>
    </>
  );
}

export { AdminUserDataPanel };
