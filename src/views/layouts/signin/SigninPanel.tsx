import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, message, Form } from 'antd';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postSignin } from 'api/requests/requestUser';
import { colorLight } from 'styles/colors';
import { DefaultButton } from 'views/components/Button/DefaultButton';
import { BackButton } from 'views/components/Button/BackButton';

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
  font-family: 'Pretendard-Bold';
  margin-bottom: 20px;
`;

const forgotPasswordCss = css`
  width: 100%;
  font-size: 14px;
  color: ${colorLight.primaryColor};
`;

const authTextCss = css`
  font-size: 16px;
  color: ${colorLight.txtColor};
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
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      requestSignin();
      messageApi.open({
        type: 'success',
        content: '로그인 성공',
      });
      if (data.isSurveyCompleted === 'N') {
        navigate(`/survey?memberId=${data.memberId}`);
      } else {
        navigate('/');
      }
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
    <Form css={containerCss} colon={false} labelAlign="left" onFinish={onFinish}>
      <BackButton />
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
      <DefaultButton htmlType="submit" loading={signinMutation.isPending} isMain={true}>
        로그인
      </DefaultButton>
      <DefaultButton onClick={handleSignup} isMain={false}>
        회원가입
      </DefaultButton>
      <span css={authTextCss} onClick={handleAuth}>
        또는, 간편 로그인 하기(임시 로그인 버튼)
      </span>
    </Form>
  );
}

export { SigninPanel };
