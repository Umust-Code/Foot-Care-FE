import { css } from '@emotion/react';
import { Button, Form, Modal } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteComment } from 'api/requests/requestPost';

const containerCss = css`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 3px;
`;

const buttonCss = css`
  padding: 0;
  font-size: 12px;
  min-width: 50px;
  height: 25px;
  margin: 5;
`;

function CommentControlBtn({ data }: any) {
  //삭제 modal + form 상태관리
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [errorModalState, setErrorModalState] = useState(false);

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      setDeletePostModal(false);
      setConfirmModalState(true);
    },
    onError: () => {
      setErrorModalState(true);
    },
  });

  return (
    <>
      <div css={containerCss}>
        <Button css={buttonCss} onClick={() => setDeletePostModal(true)}>
          삭제
        </Button>
      </div>

      <Modal
        title={'설정 확인'}
        open={deletePostModal}
        onOk={() => deleteCommentMutation.mutate(data.commentId)}
        onCancel={() => setDeletePostModal(false)}
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
        title={'성공'}
        open={confirmModalState}
        width={400}
        centered={true}
        footer={[
          <Button key="ok" type="primary" onClick={() => setConfirmModalState(false)}>
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
          <Button key="ok" type="primary" onClick={() => setErrorModalState(false)}>
            확인
          </Button>,
        ]}
      >
        오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </Modal>
    </>
  );
}

export { CommentControlBtn };
