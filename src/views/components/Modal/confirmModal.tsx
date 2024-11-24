import { Modal, Button } from 'antd';
import { css } from '@emotion/react';
import React, { useState } from 'react';

const containerCss = css`
  display: flex;
  flex-direction: column;

  .ant-modal-header {
    margin-bottom: 20px;
  }
`;

interface ConfirmModalProps {
  open: boolean;
  close: any;
  title: string;
  okText: string;
  cancelText: string;
  confirmText: string;
}

function ConfirmModal(props: ConfirmModalProps) {
  return (
    <>
      <Modal
        title={props.title}
        open={props.open}
        width={400}
        centered={true}
        footer={[
          <Button key="ok" type="primary" onClick={props.close}>
            {props.okText}
          </Button>,
        ]}
      >
        {props.confirmText}
      </Modal>
    </>
  );
}

export { ConfirmModal };
