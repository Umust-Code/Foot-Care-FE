import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from 'api/models/response';
import { getPosts } from 'api/requests/requestPost';
import { useQuery, useMutation } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { Input } from 'antd';

const containerCss = css`
  width: 100%;
  height: 130px;
  border: 1px solid ${colorLight.borderColor};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

function PostPanel() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  const post = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPosts(Number(postId)),
  });

  const [comment, setComment] = useState('');

  //   const postComment = useMutation({
  //     mutationFn: () => postComment(Number(postId), comment),
  //   });

  return (
    <div css={containerCss}>
      <h1>게시물 #{postId}</h1>
      <div>
        <p>게시물 ID: {postId}</p>
        <p>카테고리 ID: {post.data?.categoryId}</p>
        <p>게시물 제목: {post.data?.postName}</p>
        <p>게시물 내용: {post.data?.postContentName}</p>
        <p>게시물 날짜: {post.data?.postDate}</p>
        <p>조회수: {post.data?.postView}</p>
        <Input
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
}

export { PostPanel };
