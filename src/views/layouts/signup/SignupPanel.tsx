import { css } from '@emotion/react';
import { Button, Input, Form, message } from 'antd';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { postSignup } from 'api/requests/requestUser';
import { useMutation } from '@tanstack/react-query';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

type FieldType = {
  id: string;
  password: string;
  pwdConfirm: string;
  name: string;
  phone: string;
  address: string;
};

function SignupPanel() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: '회원가입 성공',
      });
      navigate('/signin');
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    },
    onMutate: () => {},
  });

  const onFinish = (values: any) => {
    const { pwdConfirm, ...signupData } = values;
    console.log(signupData);
    signupMutation.mutate(signupData);
  };

  return (
    <Form
      css={containerCss}
      colon={false}
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {contextHolder}
      <span>회원가입 페이지</span>
      <div>
        <Form.Item<FieldType>
          name="id"
          label="아이디"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <Input placeholder="아이디" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          label="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>

        <Form.Item<FieldType>
          label="비밀번호 확인"
          name="pwdConfirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '비밀번호를 다시 입력해주세요.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="name"
          label="이름"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input placeholder="이름" />
        </Form.Item>

        <Form.Item<FieldType>
          name="phone"
          label="전화번호"
          rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
        >
          <Input placeholder="전화번호" />
        </Form.Item>

        <Form.Item<FieldType>
          name="address"
          label="주소"
          rules={[{ required: true, message: '주소를 입력해주세요.' }]}
        >
          <Input placeholder="주소" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </div>
    </Form>
  );
}

export { SignupPanel };
