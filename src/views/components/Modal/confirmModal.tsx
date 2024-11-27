import { Modal, Button } from 'antd';
import { css } from '@emotion/react';

const containerCss = css`
  display: flex;
  flex-direction: column;

  .ant-modal-header {
    margin-bottom: 20px;
  }
`;

interface ConfirmModalProps {
  open: boolean;
  title: string;
  okText: string;
  confirmText: string;
  onOk: () => void;
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
          <Button key="ok" type="primary" onClick={props.onOk}>
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
