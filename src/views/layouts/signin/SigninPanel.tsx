import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, message, Form } from 'antd';
import { requestSignin, requestAdmin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postSignin } from 'api/requests/requestUser';
import { colorLight } from 'styles/colors';
import { DefaultButton } from 'views/components/Button/DefaultButton';
import { BackButton } from 'views/components/Button/BackButton';
import { useUserInfoStore } from 'stores/userStore';
import { useAdminStore } from 'stores/authStore';
import { KAKAO_LINK } from 'api/constant';

//img
import kakao from 'assets/kakao.png';
import google from 'assets/google.png';

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

const snsLoginCss = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 5px;
`;

const snsIconCss = css`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

type FieldType = {
  id: string;
  password: string;
};

function SigninPanel() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { changeUserInfo } = useUserInfoStore();
  const signinMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      changeUserInfo({ memberId: data.memberId, fg: data.fg });
      if (data.fg === 'Y') {
        requestAdmin();
      }
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

  // 임시 로그인
  const handleAuth = () => {
    requestSignin();
    requestAdmin();
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_LINK;
  };

  return (
    <Form css={containerCss} colon={false} labelAlign="left" onFinish={onFinish}>
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
      <span css={authTextCss}>또는, 간편 로그인 하기</span>
      <div css={snsLoginCss}>
        <img css={snsIconCss} src={kakao} alt="kakao" onClick={kakaoLoginHandler} />
        <img css={snsIconCss} src={google} alt="google" onClick={() => navigate('/chatroom')} />
      </div>
    </Form>
  );
}

export { SigninPanel };
