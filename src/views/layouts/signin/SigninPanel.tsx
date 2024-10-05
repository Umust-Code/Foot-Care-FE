import { css } from '@emotion/react';
import { Button, Input } from 'antd';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';


const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function SigninPanel() {
  const navigate = useNavigate();

  const handleSignin = () => {
    requestSignin();
    navigate('/');
  };

  return (
    <div css={containerCss}>
      <span>로그인 페이지</span>
      <div>
        <Input placeholder="아이디" />
        <Input placeholder="비밀번호" />
        <Button onClick={handleSignin}>로그인</Button>
      </div>
    </div>
  );
}

export { SigninPanel };
