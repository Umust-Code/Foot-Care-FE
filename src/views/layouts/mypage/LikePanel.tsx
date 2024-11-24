import { css } from '@emotion/react';
import { useState } from 'react';
import { SearchInput } from 'views/components/Input/SearchInput';
import { JumboTabs } from 'antd-mobile';
import { ContentCard } from 'views/layouts/content/ContentCard';
import { getLikePost } from 'api/requests/requestPost';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { Post } from 'api/models/response';
import { BackButton } from 'views/components/Button/BackButton';
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

const titleCss = css`
  font-size: 24px;
  font-family: 'Pretendard-Bold';
  margin-top: 15px;
  margin-bottom: 10px;
`;

const cardContainerCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

function LikePanel() {
  const { userInfo } = useUserInfoStore();
  const [categoryId, setCategoryId] = useState(0);
  // const allPost = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  const likePost = useQuery<Post[], Error>({
    queryKey: ['likePost'],
    queryFn: () => getLikePost(userInfo.memberId),
  });

  const [search, setSearch] = useState('');

  const filteredPosts = likePost.data?.filter((post) => {
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
      <BackButton />
      <div css={titleCss}>좋아요 목록</div>

      <SearchInput
        placeholder="게시물 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div css={cardContainerCss}>
        {likePost.isLoading ? (
          <Skeleton active />
        ) : (
          filteredPosts?.map((item) => (
            <ContentCard
              title={item.postName}
              like={item.likeCount}
              key={item.postId}
              postId={item.postId}
            />
          ))
        )}
        {/* {samplePost?.map((item) => (
          <ContentCard
            title={item.postName}
            like={item.likeCount}
            key={item.postId}
            postId={item.postId}
          />
        ))} */}
      </div>
    </div>
  );
}

export { LikePanel };
