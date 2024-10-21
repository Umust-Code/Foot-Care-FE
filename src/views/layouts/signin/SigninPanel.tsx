import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, message, Form } from 'antd';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postSignin } from 'api/requests/requestUser';
import { colorLight } from 'styles/colors';

const backButtonCss = css`
  font-size: 24px;
  position: absolute;
  top: 40px;
  left: 20px;
`;

const containerCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: auto;
  .ant-form-item {
    margin-bottom: 0px;
  }
  padding: 20px;
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

const titleCss = css`
  font-size: 26px;
  font-family: 'Lexend-Bold';
  margin-bottom: 20px;
`;

const forgotPasswordCss = css`
  width: 100%;
  font-size: 14px;
  color: ${colorLight.primaryColor};
`;

const loginButtonCss = css`
  width: 100%;
  height: 40px;
  background-color: ${colorLight.pointColor};
  border-radius: 12px;

  outline: none;
  &:focus {
    outline: none;
  }
`;

const signupButtonCss = css`
  width: 100%;
  height: 40px;
  background-color: ${colorLight.subBtnColor};
  border-radius: 12px;

  outline: none;
  &:focus {
    outline: none;
  }
`;

const authTextCss = css`
  font-size: 16px;
  color: ${colorLight.txtColor};
`;

const buttonTextCss = css`
  color: ${colorLight.txtColor};
  font-family: 'Lexend-Bold';
`;

type FieldType = {
  id: string;
  password: string;
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
    <>
      <Form
        css={containerCss}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <ArrowLeftOutlined css={backButtonCss} />
        {contextHolder}
        <span css={titleCss}>로그인</span>
        <Form.Item<FieldType>
          css={formItemCss}
          name="id"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input placeholder="이메일 주소" css={inputCss} />
        </Form.Item>
        <Form.Item<FieldType>
          css={formItemCss}
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호" css={inputCss} />
        </Form.Item>
        <div css={forgotPasswordCss}>비밀번호를 잊으셨나요?</div>
        <Button htmlType="submit" loading={signinMutation.isPending} css={loginButtonCss}>
          <span css={buttonTextCss}>로그인</span>
        </Button>
        <Button onClick={handleSignup} css={signupButtonCss}>
          <span css={buttonTextCss}>회원가입</span>
        </Button>
        <span css={authTextCss} onClick={handleAuth}>
          또는, 간편 로그인 하기
        </span>
      </Form>
    </>
  );
}

export { SigninPanel };
