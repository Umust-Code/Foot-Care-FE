import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  const menuContainerCss = css`
    display: flex;
    font-size: 18px;
    height: 30px;
    margin-left: 5px;
    align-items: center;
    margin-bottom: 5px;
    font-family: 'pretendard-bold';
  `;

  const items = [
    {
      key: '1',
      label: '게시물 관리',
    },
    {
      key: '2',
      label: '댓글 관리',
    },
    {
      key: '3',
      label: '사용자 통계',
    },
  ];

  const containerCss = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `;

  const contentCss = css`
    width: 100%;
    height: 100%;
    padding: 10px;
  `;

  return (
    <>
      <div css={containerCss}>
        <div css={contentCss}>
          <Dropdown
            dropdownRender={(menu) => (
              <div
                css={css`
                  .ant-dropdown-menu {
                    border-radius: 0px;
                  }
                  &&& .ant-dropdown-menu-item-selected {
                    background-color: white;
                  }
                `}
              >
                {menu}
              </div>
            )}
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['1'],
              onClick: ({ key }) => {
                if (key === '1') navigate('/admin/post');
                if (key === '2') navigate('/admin/comment');
                if (key === '3') navigate('/admin/userdata');
              },
            }}
          >
            <Space>
              <div css={menuContainerCss}>관리자 메뉴</div>
              <DownOutlined />
            </Space>
          </Dropdown>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export { AdminPanel };
