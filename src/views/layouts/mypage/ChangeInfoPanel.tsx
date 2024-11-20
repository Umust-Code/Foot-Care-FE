import { css } from '@emotion/react';
import { BackButton } from 'views/components/Button/BackButton';
import { Form, Input } from 'antd';
import { DefaultButton } from 'views/components/Button/DefaultButton';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  align-items: center;
  gap: 10px;
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

const titleCss = css`
  font-size: 24px;
  font-family: 'Pretendard-Bold';
  margin-top: 15px;
`;

const formCss = css`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const formItemCss = css`
  width: 100%;
  align-content: center;
`;

const inputCss = css`
  width: 100%;
  height: 56px;
  font-size: 16px;
  border-radius: 12px;
`;

const buttonContainerCss = css`
  display: flex;
  justify-content: flex-end;
`;

type FieldType = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

function ChangeInfoPanel() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div css={containerCss}>
      <BackButton />
      <div css={titleCss}>내 정보 수정</div>
      <Form layout="vertical" css={formCss} colon={false} onFinish={onFinish} autoComplete="off">
        <Form.Item<FieldType> label="이메일" name="id" css={formItemCss}>
          <Input placeholder="이메일 주소" css={inputCss} />
        </Form.Item>
        <Form.Item<FieldType> label="닉네임" name="name" css={formItemCss}>
          <Input placeholder="닉네임" css={inputCss} />
        </Form.Item>
        <Form.Item<FieldType> label="주소" name="address" css={formItemCss}>
          <Input placeholder="주소" css={inputCss} />
        </Form.Item>
        <Form.Item<FieldType> label="전화번호" name="phone" css={formItemCss}>
          <Input placeholder="전화번호" css={inputCss} />
        </Form.Item>
        <div css={buttonContainerCss}>
          <DefaultButton isMain={true} width="75px" htmlType="submit">
            저장
          </DefaultButton>
        </div>
      </Form>
    </div>
  );
}

export { ChangeInfoPanel };
