import { css } from '@emotion/react';
import { SearchInput } from 'views/components/Input/SearchInput';
import { JumboTabs } from 'antd-mobile';
import { ContentCard } from './ContentCard';

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

const cardContainerCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

function ContentPanel() {
  const sampleData = [
    {
      title: '지긋지긋한 굳은 살, 이 생활 습관으로 해결했다.',
      like: 1200,
    },
    {
      title: '여름철 발냄새를 예방하는 가장 확실한 방법',
      like: 120,
    },
    {
      title: '페디큐어는 언제마다 하는 것이 좋을까?',
      like: 1020,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
    {
      title: '내성발톱, 함부로 제거해도 될까요?',
      like: 20,
    },
  ];
  return (
    <div css={containerCss}>
      <SearchInput placeholder="게시물 검색" />
      <JumboTabs style={{ width: '100%' }}>
        <JumboTabs.Tab title="모든 카테고리" description={null} key="all" />
        <JumboTabs.Tab title="생활 습관" description={null} key="life" />
        <JumboTabs.Tab title="제품 추천" description={null} key="product1" />
        <JumboTabs.Tab title="제품 추천" description={null} key="product2" />
        <JumboTabs.Tab title="제품 추천" description={null} key="product4" />
        <JumboTabs.Tab title="제품 추천" description={null} key="product5" />
        <JumboTabs.Tab title="제품 추천" description={null} key="product6" />
      </JumboTabs>
      <div css={cardContainerCss}>
        {sampleData.map((item, index) => (
          <ContentCard title={item.title} like={item.like} key={index} />
        ))}
      </div>
    </div>
  );
}

export { ContentPanel };
