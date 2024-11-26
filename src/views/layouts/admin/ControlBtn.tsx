import { css } from '@emotion/react';
import { Button, Form } from 'antd';
import { useState } from 'react';
import { useApiStatus } from 'hooks/useApiStatus';
import { BasicModal } from 'views/components/Modal/BasicModal';
import { EditForm } from './EditPostForm';
import { DeleteForm } from './DeletePostForm';

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

function ControlBtn({ data }: any) {
  //수정 modal + form 상태관리
  const [editPostModal, setEditPostModal] = useState(false);
  const [editPostForm] = Form.useForm();

  //삭제 modal + form 상태관리
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [deletePostForm] = Form.useForm();

  //api 상태 관리
  const [status, handleStatusChange] = useApiStatus();

  return (
    <>
      <div css={containerCss}>
        <Button css={buttonCss} onClick={() => setEditPostModal(true)}>
          수정
        </Button>
        <Button css={buttonCss} onClick={() => setDeletePostModal(true)}>
          삭제
        </Button>
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
          form={editPostForm}
          previousData={data}
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
          form={deletePostForm}
          previousData={data}
          onStatusChange={handleStatusChange}
          close={() => setDeletePostModal(false)}
        />
      </BasicModal>
    </>
  );
}

export { ControlBtn };
