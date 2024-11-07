import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post, Comment } from 'api/models/response';
import { getPosts, getComment, postComment, likePost, unlikePost } from 'api/requests/requestPost';
import { useQuery, useMutation } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { Button, Input } from 'antd';

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

function PostPanel() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  const post = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPosts(Number(postId)),
  });

  const comment = useQuery<Comment[]>({
    queryKey: ['comment', postId],
    queryFn: () => getComment(Number(postId)),
  });

  const [addComment, setAddComment] = useState('');
  const sendComment = useMutation({
    mutationFn: () => postComment(Number(postId), { commentContent: addComment }),
    onSuccess: () => {
      comment.refetch();
      setAddComment('');
    },
    onError: () => {},
    onMutate: () => {},
  });

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const likeMutation = useMutation({
    mutationFn: () => (isLiked ? unlikePost(Number(postId)) : likePost(Number(postId))),
    onSuccess: () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      comment.refetch();
    },
  });

  return (
    <div css={containerCss}>
      <h1>게시물 #{postId}</h1>
      <div>
        <p>게시물 ID: {postId}</p>
        <p>카테고리 ID: {post.data?.categoryId}</p>
        <p>게시물 제목: {post.data?.postName}</p>
        <p>게시물 내용: {post.data?.postContentName}</p>
        <p>게시물 날짜: {post.data?.postDate}</p>
        <p>좋아요 수: {post.data?.likeCount}</p>
        <p>조회수: {post.data?.postView}</p>
        <Input
          placeholder="댓글을 입력하세요"
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
        />
        <Button onClick={() => sendComment.mutate()}>댓글 보내기</Button>
        <Button
          onClick={() => likeMutation.mutate()}
          type={isLiked ? 'primary' : 'default'}
          loading={likeMutation.isPending}
        >
          좋아요 {likeCount}
        </Button>
        {comment.data?.map((comment) => <p key={comment.commentId}>{comment.commentContent}</p>)}
      </div>
    </div>
  );
}

export { PostPanel };
