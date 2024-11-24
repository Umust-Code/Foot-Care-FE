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

  const [search, setSearch] = useState('');

  const filteredPosts = categoryPost.data?.filter((post) => {
    if (!search) return true; // 검색어가 없으면 모든 게시물 표시

    return (
      post.postName.toLowerCase().includes(search.toLowerCase()) ||
      post.postContentName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const samplePost = [
    {
      postId: 18,
      categoryId: 7,
      postName: '좋아1111요 예제',
      postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
      postDate: '2024-10-10',
      postView: 0,
      likeCount: 0,
    },
    {
      postId: 19,
      categoryId: 7,
      postName: '좋아1111요 예제',
      postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
      postDate: '2024-10-10',
      postView: 0,
      likeCount: 0,
    },
    {
      postId: 20,
      categoryId: 1,
      postName: '좋아1111요 예제',
      postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
      postDate: '2024-10-10',
      postView: 0,
      likeCount: 0,
    },
    {
      postId: 21,
      categoryId: 5,
      postName: '임시훈 발냄새 예제',
      postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
      postDate: '2024-10-10',
      postView: 0,
      likeCount: 0,
    },
  ];

  return (
    <div css={containerCss}>
      <SearchInput
        placeholder="게시물 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
        {/* {categoryPost.isLoading ? (
          <Skeleton active />
        ) : (
          samplePost?.map((item) => (
            <ContentCard
              title={item.postName}
              like={item.likeCount}
              key={item.postId}
              postId={item.postId}
            />
          ))
        )} */}
        {samplePost?.map((item) => (
          <ContentCard
            title={item.postName}
            like={item.likeCount}
            key={item.postId}
            postId={item.postId}
          />
        ))}
      </div>
    </div>
  );
}

export { ContentPanel };
