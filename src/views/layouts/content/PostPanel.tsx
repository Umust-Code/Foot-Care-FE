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

const likeCss = css`
  width: 50px;
  height: 24px;
  font-size: 12px;
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

  useEffect(() => {
    if (post.data?.likeCount !== undefined) {
      setLikeCount(post.data.likeCount);
    }
  }, [post.data]);

  return (
    <div css={containerCss}>
      <h1>{post.data?.postName}</h1>
      <div>
        <div
          css={css`
            width: 100%;
            height: 400px;
            background-color: ${colorLight.primaryColor};
          `}
        ></div>
        {/* <p>게시물 ID: {postId}</p> */}
        {/* <p>카테고리 ID: {post.data?.categoryId}</p> */}
        <p>게시물 내용: {post.data?.postContentName}</p>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: grey;
          `}
        >
          <span> {post.data?.postDate}</span>
          <span> {post.data?.postView}</span>
        </div>
        <Button
          css={likeCss}
          onClick={() => likeMutation.mutate()}
          type={isLiked ? 'primary' : 'default'}
          loading={likeMutation.isPending}
        >
          좋아요 {likeCount}
        </Button>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            gap: 10px;
          `}
        >
          <Input
            css={css`
              width: 80%;
            `}
            placeholder="댓글을 입력하세요"
            value={addComment}
            onChange={(e) => setAddComment(e.target.value)}
          />
          <Button onClick={() => sendComment.mutate()}>전송</Button>
        </div>
        {comment.data?.map((comment) => <p key={comment.commentId}>{comment.commentContent}</p>)}
      </div>
    </div>
  );
}

export { PostPanel };
