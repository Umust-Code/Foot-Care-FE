import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { css } from '@emotion/react';

const containerCss = css`
  display: flex;
  flex-direction: column;

  .ant-modal-header {
    margin-bottom: 20px;
  }
`;

interface BasicModalProps {
  apiStatus?: any;
  onStatusChange?: any;
  form?: any[];
  width?: string | number;
  open: boolean;
  close: any;
  title: string;
  okText: string;
  cancelText: string;
  children: React.ReactNode;
  confirmText: string;
}

function BasicModal({ children, ...props }: BasicModalProps) {
  const [confirmModalState, setConfirmModalState] = useState(false);

  const handleOk = () => {
    if (props.form) {
      Promise.all(props.form.map((form) => form.validateFields()))
        .then((values) => {
          console.log('유효성 검사 성공:', values);
          setConfirmModalState(true);
        })
        .catch((info) => {
          console.log('유효성 검사 실패:', info);
        });
    } else {
      setConfirmModalState(true);
    }
  };

  const confirmComplete = () => {
    if (props.form) {
      props.form.forEach((form) => form.submit());
    }
    setConfirmModalState(false);
  };

  const handleCancel = () => {
    if (props.form) {
      props.form.forEach((form) => form.resetFields());
    }
    props.close();
  };

  return (
    <>
      <Modal
        title={props.title}
        open={props.open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        destroyOnClose={true}
        css={containerCss}
        width={props.width || 520}
        zIndex={100}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={props.apiStatus === 'loading'}>
            {props.cancelText}
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={handleOk}
            loading={props.apiStatus === 'loading'}
          >
            {props.okText}
          </Button>,
        ]}
      >
        {children}
      </Modal>

      <Modal
        title={'설정 확인'}
        open={confirmModalState}
        onOk={confirmComplete}
        onCancel={() => setConfirmModalState(false)}
        width={400}
        centered={true}
        okText="확인"
        cancelText="취소"
        maskClosable={false}
        zIndex={1000}
      >
        {props.confirmText}
      </Modal>

      <Modal
        title={'성공'}
        open={props.apiStatus === 'success'}
        width={400}
        centered={true}
        footer={[
          <Button key="ok" type="primary" onClick={() => props.onStatusChange('idle')}>
            확인
          </Button>,
        ]}
      >
        요청을 성공적으로 수행하였습니다.
      </Modal>

      <Modal
        title={'실패'}
        open={props.apiStatus === 'error'}
        width={400}
        centered={true}
        footer={[
          <Button key="ok" type="primary" onClick={() => props.onStatusChange('idle')}>
            확인
          </Button>,
        ]}
      >
        오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </Modal>
    </>
  );
}

export { BasicModal };
