import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post, Comment } from 'api/models/response';
import {
  getPosts,
  getComment,
  postComment,
  likePost,
  unlikePost,
  getIsLiked,
} from 'api/requests/requestPost';
import { useQuery, useMutation } from '@tanstack/react-query';
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { Button, Input } from 'antd';
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
  font-size: 26px;
  /* font-family: 'Pretendard-Bold'; */
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const contentCss = css`
  margin-top: 10px;
  font-size: 18px;
  line-height: 22px;
  white-space: pre-wrap;
`;

const likeCss = (isLiked: string | undefined) => css`
  color: ${isLiked === 'Y' ? '#ff5e5e' : 'black'};
  font-size: 26px;
`;

const commentCss = css`
  font-size: 26px;
`;

const likeCountCss = css`
  font-size: 18px;
`;

function PostPanel() {
  const { userInfo } = useUserInfoStore();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  const post = useQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () => getPosts(Number(postId)),
  });

  // sample post
  // const post = {
  //   data: {
  //     postId: 1,
  //     categoryId: 1,
  //     postName: '페디큐어는 언제마다 하는 것이 좋을까?',
  //     postContentName:
  //       '발 관리는 생각보다 중요해요!\n여러분의 발 건강과 아름다움을 위해 적절한 페디큐어 주기를 확인해보세요.👇\n\n💡 일반적인 페디큐어 주기✔️ 4~6주에 한 번: 발톱 관리와 각질 제거를 위해 적당한 주기예요!\n\n💡 더 자주 해야 하는 경우\n✔️ 2~4주에 한 번:\n 발이 건조하거나 각질이 많을 때 \n여름철처럼 발을 자주 노출할 때 \n\n💡 주의할 점❌ 너무 잦은 페디큐어는 발톱과 피부에 부담이 될 수 있어요.\n✔️ 주기적으로 네일 컬러를 지우고 발톱이 쉬는 시간을 주세요.\n\n발 건강을 위해 페디큐어뿐만 아니라, 꾸준한 보습 관리도 잊지 마세요! ✨',
  //     postDate: '2024-03-20',
  //     postView: 128,
  //     likeCount: 15,
  //   },
  // };
  const isLikedQuery = useQuery({
    queryKey: ['isLiked', postId],
    queryFn: () => getIsLiked(Number(postId), userInfo.memberId),
  });

  const comment = useQuery<Comment[]>({
    queryKey: ['comment', postId],
    queryFn: () => getComment(Number(postId)),
  });

  const [addComment, setAddComment] = useState('');
  const [likeCount, setLikeCount] = useState<number>(0);

  const sendComment = useMutation({
    mutationFn: () =>
      postComment(Number(postId), userInfo.memberId, { commentContent: addComment }),
    onSuccess: () => {
      comment.refetch();
      setAddComment('');
    },
  });

  const likeMutation = useMutation({
    mutationFn: () =>
      isLikedQuery.data === 'Y'
        ? unlikePost(Number(postId), userInfo.memberId)
        : likePost(Number(postId), userInfo.memberId),
    onSuccess: () => {
      setLikeCount((prev) => (isLikedQuery.data === 'Y' ? prev - 1 : prev + 1));
      isLikedQuery.refetch();
      comment.refetch();
    },
  });

  useEffect(() => {
    if (post.isSuccess && post.data?.likeCount !== undefined) {
      setLikeCount(post.data.likeCount);
    }
  }, [post.isSuccess, post.data]);

  return (
    <div css={containerCss}>
      <BackButton />
      <div
        css={css`
          width: 100%;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <div css={titleCss}>{post.data?.postName}</div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            font-size: 14px;
          `}
        >
          <span> {post.data?.postDate}</span>
          <span> 조회수 {post.data?.postView}</span>
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              height: 400px;
              background-color: ${colorLight.primaryColor};
            `}
          ></div>
          <div css={contentCss}>{post.data?.postContentName}</div>

          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 6px;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 6px;
                margin-right: 8px;
              `}
            >
              <CommentOutlined css={commentCss} />
              <div css={likeCountCss}>{comment.data?.length}</div>
            </div>
            {isLikedQuery.data === 'Y' ? (
              <HeartFilled css={likeCss(isLikedQuery.data)} onClick={() => likeMutation.mutate()} />
            ) : (
              <HeartOutlined
                css={likeCss(isLikedQuery.data)}
                onClick={() => likeMutation.mutate()}
              />
            )}
            <div css={likeCountCss}>{likeCount.toLocaleString('ko-KR')}</div>
          </div>

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
          {comment.data?.map((comment) => (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: 5px 0;
              `}
            >
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                `}
              >
                <div>{comment.name}</div>
                <div
                  css={css`
                    font-size: 10px;
                    color: #999;
                  `}
                >
                  {comment.commentDate}
                </div>
              </div>
              <div
                css={css`
                  font-size: 14px;
                `}
              >
                {comment.commentContent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PostPanel };
