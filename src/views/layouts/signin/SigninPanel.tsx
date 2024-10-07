import { css } from '@emotion/react';
import { Button, Input, message, Form } from 'antd';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postSignin } from 'api/requests/requestUser';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const formCss = css`
  align-content: center;
  gap: 10px;
`;

type FieldType = {
  id: string;
  pwd: string;
};

function SigninPanel() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const signinMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: () => {
      requestSignin();
      messageApi.open({
        type: 'success',
        content: '로그인 성공',
      });
      navigate('/');
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
    signinMutation.mutate(values);
  };

  const handleAuth = () => {
    requestSignin();
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Form
      css={containerCss}
      colon={false}
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      {contextHolder}
      <span>로그인 페이지</span>
      <div css={formCss}>
        <Form.Item<FieldType>
          name="id"
          label="아이디"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <Input placeholder="아이디" />
        </Form.Item>
        <Form.Item<FieldType>
          name="pwd"
          label="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={signinMutation.isPending}>
          로그인
        </Button>
      </div>

      <Button onClick={handleSignup}>회원가입</Button>
      <Button onClick={handleAuth}>로그인 없이 인증받기</Button>
    </Form>
  );
}

export { SigninPanel };
