import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';

function HomePanel() {
  const handleLogout = () => {
    requestSignout();
  };
  return (
    <div>
      <Button icon={<LogoutOutlined />} onClick={handleLogout} />
      <span>홈페이지</span>
    </div>
  );
}

export { HomePanel };
