import { css } from '@emotion/react';
import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Form, message, Checkbox, Space, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postSignup, getCheckId } from 'api/requests/requestUser';
import { useMutation } from '@tanstack/react-query';
import { Signup } from 'api/models/request';
import { colorLight } from 'styles/colors';
import { BackButton } from 'views/components/Button/BackButton';
import { DefaultButton } from 'views/components/Button/DefaultButton';

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
  font-family: 'Pretendard-Bold';
  margin-bottom: 20px;
`;

const formItemCss = css`
  width: 100%;
  align-content: center;
  /* display: flex; */
`;

const inputCss = css`
  width: 100%;
  height: 46px;
  font-size: 16px;
  border-radius: 12px;
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
  sex: string;
};

function SignupPanel() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

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

  const checkIdMutation = useMutation({
    mutationFn: getCheckId,
    onSuccess: (data) => {
      if (data === 'N') {
        setIsIdChecked(true);
        messageApi.open({
          type: 'success',
          content: '사용 가능한 이메일 주소입니다.',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: '이미 사용 중인 이메일 주소입니다.',
        });
      }
      form.validateFields(['id']);
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    },
  });

  const onFinish = (values: any) => {
    const { pwdConfirm, ...signupData } = values;
    signupMutation.mutate(signupData);
  };

  return (
    <Form form={form} css={containerCss} colon={false} onFinish={onFinish} autoComplete="off">
      {contextHolder}
      <BackButton />
      <span css={titleCss}>회원가입 페이지</span>
      <Form.Item<FieldType>
        name="id"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (isIdChecked) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('이메일 중복 확인이 필요합니다.'));
            },
          }),
        ]}
        css={formItemCss}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="이메일 주소"
            css={inputCss}
            onChange={(e) => {
              setId(e.target.value);
              setIsIdChecked(false);
            }}
          />
          <Button
            onClick={() => {
              checkIdMutation.mutate(id);
              form.validateFields(['id']);
            }}
            css={css`
              height: 46px;
            `}
          >
            중복확인{isIdChecked ? 'O' : 'X'}
          </Button>
        </Space.Compact>
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
      <Form.Item<FieldType>
        name="sex"
        rules={[{ required: true, message: '성별을 선택해주세요.' }]}
        css={formItemCss}
      >
        <Radio.Group>
          <Radio value="M">남성</Radio>
          <Radio value="F">여성</Radio>
        </Radio.Group>
      </Form.Item>
      <div css={agreementCss}>
        회원가입을 위해 이용약관 및 개인정보보호정책에 동의합니다
        <Checkbox
          css={CustomCheckbox}
          onChange={() => setIsAgreementChecked(!isAgreementChecked)}
        />
      </div>
      <DefaultButton htmlType="submit" isMain={true} disabled={!isAgreementChecked}>
        회원가입
      </DefaultButton>
    </Form>
  );
}

export { SignupPanel };
