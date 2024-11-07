import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from 'api/models/response';
import { getPosts } from 'api/requests/requestPost';
import { useQuery } from '@tanstack/react-query';

function PostPanel() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  const post = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPosts(Number(postId)),
  });

  return (
    <div>
      <h1>게시물 #{postId}</h1>
      <div>
        <p>게시물 ID: {postId}</p>
        <p>카테고리 ID: {post.data?.categoryId}</p>
        <p>게시물 제목: {post.data?.postName}</p>
        <p>게시물 내용: {post.data?.postContentName}</p>
        <p>게시물 날짜: {post.data?.postDate}</p>
        <p>조회수: {post.data?.postView}</p>
      </div>
    </div>
  );
}

export { PostPanel };
