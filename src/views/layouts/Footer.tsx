import { MoonOutlined, LogoutOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Menu, MenuProps } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { colorLight } from 'styles/colors';
import { NavBar, TabBar } from 'antd-mobile';
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

const menuCss = css`
  width: 100%;
  height: 48px;
  font-size: 14px;
`;

const sideButtonWrapperCss = css`
  display: flex;
  gap: 10px;
`;

type MenuItem = Required<MenuProps>['items'][number];

const tabs = [
  {
    key: '/',
    title: '홈',
    icon: <AppOutline />,
  },
  {
    key: '/content',
    title: '콘텐츠',
    icon: <UnorderedListOutline />,
  },
  {
    key: '/shopping',
    title: '쇼핑',
    icon: <MessageOutline />,
  },
  {
    key: '/my-page',
    title: '마이페이지',
    icon: <UserOutline />,
  },
];
function Footer() {
  const [curPath, setCurPath] = useState(window.location.pathname); // key

  const handleMenuItemClick = (e: any) => {
    setCurPath(e.key);
  };

  const handleLocationChange = () => {
    setCurPath(window.location.pathname);
  };

  useEffect(() => {
    // popstate 이벤트 : history 변경 감지 (뒤로가기, 앞으로가기)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <TabBar>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}

export { Footer };
