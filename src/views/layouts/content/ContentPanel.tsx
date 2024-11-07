import { css } from '@emotion/react';
import { useState } from 'react';
import { SearchInput } from 'views/components/Input/SearchInput';
import { JumboTabs } from 'antd-mobile';
import { ContentCard } from './ContentCard';
import { getPosts, getPostsByCategory } from 'api/requests/requestPost';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { Post } from 'api/models/response';
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
  const [categoryId, setCategoryId] = useState(0);
  // const allPost = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const categoryPost = useQuery<Post[], Error>({
    queryKey: ['category', categoryId],
    queryFn: () => getPostsByCategory(categoryId),
  });

  // const sampleData = [
  //   {
  //     postId: 6,
  //     categoryId: 1,
  //     postName: 'Spring Boot CRUD 예제',
  //     postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
  //     postDate: '2024-10-10',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 7,
  //     categoryId: 2,
  //     postName: '여름철 발냄새를 예방하는 가장 확실한 방법',
  //     postContentName: '여름철 발냄새를 예방하는 가장 확실한 방법에 대해 알아봅시다.',
  //     postDate: '2024-10-11',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 8,
  //     categoryId: 3,
  //     postName: '페디큐어는 언제마다 하는 것이 좋을까?',
  //     postContentName: '페디큐어는 언제마다 하는 것이 좋을까? 알아봅시다.',
  //     postDate: '2024-10-12',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 9,
  //     categoryId: 4,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-13',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 10,
  //     categoryId: 5,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-14',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 11,
  //     categoryId: 6,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-15',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 12,
  //     categoryId: 7,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-16',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 13,
  //     categoryId: 8,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-17',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 14,
  //     categoryId: 9,
  //     postName: '내성발톱, 함부로 제거해도 될까요?',
  //     postContentName: '내성발톱, 함부로 제거해도 될까요? 알아봅시다.',
  //     postDate: '2024-10-18',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  // ];
  return (
    <div css={containerCss}>
      <SearchInput placeholder="게시물 검색" />
      <JumboTabs style={{ width: '100%' }} onChange={(key) => setCategoryId(Number(key))}>
        <JumboTabs.Tab title="모든 카테고리" description={null} key="0" />
        <JumboTabs.Tab title="족저근막염" description={null} key="1" />
        <JumboTabs.Tab title="발부종" description={null} key="2" />
        <JumboTabs.Tab title="당뇨병성 발" description={null} key="3" />
        <JumboTabs.Tab title="발 뒤꿈치 통증" description={null} key="4" />
        <JumboTabs.Tab title="무좀(발냄새)" description={null} key="5" />
        <JumboTabs.Tab title="발목 염좌" description={null} key="6" />
        <JumboTabs.Tab title="생활 습관" description={null} key="7" />
        <JumboTabs.Tab title="건강 정보" description={null} key="8" />
        <JumboTabs.Tab title="제품 추천" description={null} key="9" />
      </JumboTabs>
      <div css={cardContainerCss}>
        {categoryPost.isLoading ? (
          <Skeleton active />
        ) : (
          categoryPost.data?.map((item, index) => (
            <ContentCard title={item.postName} like={item.likeCount} key={item.postId} />
          ))
        )}
      </div>
    </div>
  );
}

export { ContentPanel };
