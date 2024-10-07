import { css } from '@emotion/react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function HomePanel() {
  const handleLogout = () => {
    requestSignout();
  };
  return (
    <div css={containerCss}>
      <Button icon={<LogoutOutlined />} onClick={handleLogout} />
      <span>홈페이지</span>
    </div>
  );
}

export { HomePanel };
