import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Form, message, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postSignup } from 'api/requests/requestUser';
import { useMutation } from '@tanstack/react-query';
import { Signup } from 'api/models/request';
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

const titleCss = css`
  font-size: 26px;
  font-family: 'Lexend-Bold';
  margin-bottom: 20px;
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

const signupButtonCss = css`
  width: 100%;
  height: 40px;
  background-color: ${colorLight.pointColor};
  border-radius: 12px;

  outline: none;
  &:focus {
    outline: none;
  }
`;

const CustomCheckbox = css`
  margin-left: 5px;
`;

const agreementCss = css`
  font-size: 12px;
  color: ${colorLight.primaryColor};
`;

type FieldType = {
  id: string;
  password: string;
  pwdConfirm: string;
  name: string;
  birth: string;
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
      <div onClick={() => navigate('/signin')}>
        <ArrowLeftOutlined css={backButtonCss} />
      </div>
      <span css={titleCss}>회원가입 페이지</span>
      <Form.Item<FieldType>
        name="id"
        rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input placeholder="이메일 주소" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input.Password placeholder="비밀번호" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
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
        css={formItemCss}
      >
        <Input.Password placeholder="비밀번호 확인" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
        name="name"
        rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input placeholder="닉네임" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
        name="birth"
        rules={[{ required: true, message: '생년월일을 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input placeholder="생년월일" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
        name="phone"
        rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input placeholder="연락처" css={inputCss} />
      </Form.Item>
      <Form.Item<FieldType>
        name="address"
        rules={[{ required: true, message: '주소를 입력해주세요.' }]}
        css={formItemCss}
      >
        <Input placeholder="주소" css={inputCss} />
      </Form.Item>
      <div css={agreementCss}>
        회원가입을 위해 이용약관 및 개인정보보호정책에 동의합니다
        <Checkbox css={CustomCheckbox} />
      </div>
      <Button htmlType="submit" css={signupButtonCss}>
        회원가입
      </Button>
    </Form>
  );
}

export { SignupPanel };
