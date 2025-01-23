import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post, Comment } from 'api/models/response';
import {
  getPosts,
  getComment,
  postComment,
  putComment,
  likePost,
  unlikePost,
  getIsLiked,
} from 'api/requests/requestPost';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { Button, Input, Form, Modal } from 'antd';
import { BackButton } from 'views/components/Button/BackButton';
import { useUserInfoStore } from 'stores/userStore';
import { getImageSrcByValue } from 'views/components/IconConverter';
import { deleteComment } from 'api/requests/requestPost';
import { useApiStatus } from 'hooks/useApiStatus';
import { BasicModal } from 'views/components/Modal/BasicModal';
import { EditForm } from 'views/layouts/admin/post/EditPostForm';
import { DeleteForm } from 'views/layouts/admin/post/DeletePostForm';
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
  font-size: 30px;
`;

const commentCss = css`
  font-size: 30px;
`;

const likeCountCss = css`
  font-size: 18px;
`;

const commentInfoCss = css`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: flex-start;
  margin: 10px 0;
`;

const nameCss = css`
  font-size: 16px;
  font-family: 'Pretendard-Bold';
`;

const commentDateCss = css`
  font-size: 14px;
  color: grey;
`;

const commentContentCss = css`
  font-size: 14px;
  margin-top: 3px;
`;

const commentControlCss = css`
  font-size: 14px;
  color: grey;
  text-decoration: underline;
`;

function PostPanel() {
  const queryClient = useQueryClient();

  // 게시물
  const { userInfo } = useUserInfoStore();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

  // const post = useQuery<Post>({
  //   queryKey: ['post', postId],
  //   queryFn: () => getPosts(Number(postId)),
  // });

  // sample post
  const post = {
    data: {
      postId: 18,
      categoryId: 1,
      postName: '페디큐어는 언제마다 하는 것이 좋을까?',
      postContentName:
        '발 관리는 생각보다 중요해요!\n여러분의 발 건강과 아름다움을 위해 적절한 페디큐어 주기를 확인해보세요.👇\n\n💡 일반적인 페디큐어 주기✔️ 4~6주에 한 번: 발톱 관리와 각질 제거를 위해 적당한 주기예요!\n\n💡 더 자주 해야 하는 경우\n✔️ 2~4주에 한 번:\n 발이 건조하거나 각질이 많을 때 \n여름철처럼 발을 자주 노출할 때 \n\n💡 주의할 점❌ 너무 잦은 페디큐어는 발톱과 피부에 부담이 될 수 있어요.\n✔️ 주기적으로 네일 컬러를 지우고 발톱이 쉬는 시간을 주세요.\n\n발 건강을 위해 페디큐어뿐만 아니라, 꾸준한 보습 관리도 잊지 마세요! ✨',
      postDate: '2024-03-20',
      postView: 128,
      likeCount: 15,
      memberId: 2,
    },
  };
  const isLikedQuery = useQuery({
    queryKey: ['isLiked', postId],
    queryFn: () => getIsLiked(Number(postId), userInfo.memberId),
  });

  const [likeCount, setLikeCount] = useState<number>(0);

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

  //수정 modal + form 상태관리
  const [editPostModal, setEditPostModal] = useState(false);
  const [editPostForm] = Form.useForm();

  //삭제 modal + form 상태관리
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [deletePostForm] = Form.useForm();

  //api 상태 관리
  const [status, handleStatusChange] = useApiStatus();

  // ----------------댓글---------------
  const [addComment, setAddComment] = useState('');

  const [controlCommentId, setControlCommentId] = useState(0);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  const [putCommentModal, setPutCommentModal] = useState(false);
  const [editComment, setEditComment] = useState<string>('');
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [errorModalState, setErrorModalState] = useState(false);

  const comment = useQuery<Comment[]>({
    queryKey: ['comment', postId],
    queryFn: () => getComment(Number(postId)),
  });

  const sampleComment = [
    {
      commentId: 1,
      postId: 12,
      commentContent: '댓글이다',
      commentDate: '2024-10-10',
      name: '사용자',
      icon: '01',
      memberId: 1,
    },
    {
      commentId: 2,
      postId: 12,
      commentContent: '댓글이에요',
      commentDate: '2024-10-10',
      name: '사용자2',
      icon: '02',
      memberId: 2,
    },
  ];

  const sendComment = useMutation({
    mutationFn: () =>
      postComment(Number(postId), userInfo.memberId, { commentContent: addComment }),
    onSuccess: () => {
      comment.refetch();
      setAddComment('');
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(controlCommentId),
    onSuccess: () => {
      setConfirmModalState(true);
      setDeleteCommentModal(false);
    },
    onError: () => {
      setErrorModalState(true);
    },
  });

  const putCommentMutation = useMutation({
    mutationFn: () => putComment(controlCommentId, { commentContent: editComment }),
    onSuccess: () => {
      setConfirmModalState(true);
      setPutCommentModal(false);
      setEditComment('');
    },
    onError: () => {
      setErrorModalState(true);
    },
  });

  // useEffect(() => {
  //   if (post.isSuccess && post.data?.likeCount !== undefined) {
  //     setLikeCount(post.data.likeCount);
  //   }
  // }, [post.isSuccess, post.data]);

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
        {userInfo.memberId === post.data?.memberId || userInfo.memberId === 1 ? (
          <div
            css={css`
              display: flex;
              flex-direction: row-reverse;
              gap: 5px;
              margin-left: 5px;
            `}
          >
            <div
              css={commentControlCss}
              onClick={() => {
                setDeletePostModal(true);
              }}
            >
              삭제
            </div>
            <div
              css={commentControlCss}
              onClick={() => {
                setEditPostModal(true);
              }}
            >
              수정
            </div>
          </div>
        ) : (
          <div />
        )}
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
              margin-top: 10px;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 6px;
              `}
            >
              {isLikedQuery.data === 'Y' ? (
                <HeartFilled
                  css={likeCss(isLikedQuery.data)}
                  onClick={() => likeMutation.mutate()}
                />
              ) : (
                <HeartOutlined
                  css={likeCss(isLikedQuery.data)}
                  onClick={() => likeMutation.mutate()}
                />
              )}
              <div css={likeCountCss}>{likeCount.toLocaleString('ko-KR')}</div>
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  margin-left: 8px;
                `}
              >
                <CommentOutlined css={commentCss} />
                <div css={likeCountCss}>{comment.data?.length}</div>
              </div>
            </div>
          </div>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              gap: 10px;
            `}
          >
            <Input
              css={css`
                width: 90%;
              `}
              placeholder="댓글을 입력하세요"
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
            />
            <Button onClick={() => sendComment.mutate()}>입력</Button>
          </div>
          {/* {sampleComment.map((comment) => ( */}
          {comment.data?.map((comment) => (
            <div>
              <div css={commentInfoCss}>
                <img
                  src={getImageSrcByValue(comment.icon)}
                  alt={'user icon'}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '30px',
                  }}
                />
                <div>
                  <div
                    css={css`
                      display: flex;
                      gap: 10px;
                      align-items: center;
                    `}
                  >
                    <div css={nameCss}>{comment.name}</div>
                    <div css={commentDateCss}>{comment.commentDate}</div>
                    {userInfo.memberId === comment.memberId || userInfo.memberId === 1 ? (
                      <div
                        css={css`
                          display: flex;
                          gap: 5px;
                          margin-left: 5px;
                        `}
                      >
                        <div
                          css={commentControlCss}
                          onClick={() => {
                            setPutCommentModal(true);
                            setControlCommentId(comment.commentId);
                          }}
                        >
                          수정
                        </div>
                        <div
                          css={commentControlCss}
                          onClick={() => {
                            setDeleteCommentModal(true);
                            setControlCommentId(comment.commentId);
                          }}
                        >
                          삭제
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div css={commentContentCss}>{comment.commentContent}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BasicModal
        apiStatus={status}
        onStatusChange={handleStatusChange}
        form={[editPostForm]}
        open={editPostModal}
        close={() => setEditPostModal(false)}
        title="게시글 수정"
        okText="수정"
        cancelText="취소"
        confirmText="입력한 값으로 게시글 정보를 수정하시겠습니까?"
      >
        <EditForm
          isAdminPage={false}
          form={editPostForm}
          previousData={post.data}
          onStatusChange={handleStatusChange}
          close={() => setEditPostModal(false)}
        />
      </BasicModal>

      <BasicModal
        apiStatus={status}
        onStatusChange={handleStatusChange}
        form={[deletePostForm]}
        open={deletePostModal}
        close={() => setDeletePostModal(false)}
        title="게시글 삭제"
        okText="삭제"
        cancelText="취소"
        confirmText="게시글을 삭제하시겠습니까?"
      >
        <DeleteForm
          isAdminPage={false}
          form={deletePostForm}
          previousData={post.data}
          onStatusChange={handleStatusChange}
          close={() => setDeletePostModal(false)}
        />
      </BasicModal>

      <Modal
        title={'설정 확인'}
        open={deleteCommentModal}
        onOk={() => deleteCommentMutation.mutate()}
        onCancel={() => setDeleteCommentModal(false)}
        width={400}
        centered={true}
        okText="확인"
        cancelText="취소"
        maskClosable={false}
        zIndex={1000}
      >
        이 댓글을 삭제하시겠습니까?
      </Modal>

      <Modal
        title={'댓글 수정'}
        open={putCommentModal}
        onOk={() => putCommentMutation.mutate()}
        onCancel={() => {
          setPutCommentModal(false);
          setEditComment('');
        }}
        width={400}
        centered={true}
        okText="확인"
        cancelText="취소"
        maskClosable={false}
        zIndex={1000}
      >
        수정할 내용을 작성해주세요
        <Input
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
          style={{ marginTop: '10px' }}
        />
      </Modal>

      <Modal
        title={'성공'}
        open={confirmModalState}
        width={400}
        centered={true}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              {
                queryClient.invalidateQueries({
                  queryKey: ['comment', postId],
                });
                setConfirmModalState(false);
              }
            }}
          >
            확인
          </Button>,
        ]}
      >
        요청을 성공적으로 수행하였습니다.
      </Modal>
      <Modal
        title={'실패'}
        open={errorModalState}
        width={400}
        centered={true}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: ['comment', postId],
              });
              setErrorModalState(false);
            }}
          >
            확인
          </Button>,
        ]}
      >
        오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </Modal>
    </div>
  );
}

export { PostPanel };
