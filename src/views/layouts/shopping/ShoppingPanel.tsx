import { Tabs } from 'antd';
import { useState } from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from 'api/requests/requestUser';
import { SearchInput } from 'views/components/Input/SearchInput';
import { getSurveyData } from 'api/requests/requestSurvey';
import { useUserInfoStore } from 'stores/userStore';
import { UserRecommend } from './UserRecommend';
import { Ranking } from './Ranking';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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

function ShoppingPanel() {
  const { userInfo } = useUserInfoStore();

  const userData = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData(userInfo.memberId),
  });

  const surveyData = useQuery({
    queryKey: ['surveyData', userInfo.memberId],
    queryFn: () => getSurveyData(userInfo.memberId),
  });
  const [search, setSearch] = useState('');

  const items = [
    {
      key: '1',
      label: '사용자 추천',
      children: (
        <div css={tabContentCss}>
          <UserRecommend name={userData.data?.name} />
        </div>
      ),
    },
    {
      key: '2',
      label: '랭킹순',
      children: (
        <div css={tabContentCss}>
          <Ranking />
        </div>
      ),
    },
  ];

  return (
    <div css={containerCss}>
      {/* <SearchInput
        placeholder="게시물 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
      <Tabs defaultActiveKey="1" items={items} style={{ width: '100%' }} />
    </div>
  );
}

export { ShoppingPanel };
