import { css } from '@emotion/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { getPostsByCategory } from 'api/requests/requestPost';
import { Post } from 'api/models/response';
import { adminColumnDef, adminDefaultColDef } from './AdminColDef';
import { BasicGrid } from 'views/components/grid/BasicGrid';
import { addCategoryName } from './adminConverter';
import { Button, Form } from 'antd';
import { AddPostForm } from './AddPostForm';
import { useApiStatus } from 'hooks/useApiStatus';
import { BasicModal } from 'views/components/Modal/BasicModal';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';

const menuContainerCss = css`
  display: flex;
  font-size: 16px;
  height: 30px;
  margin-left: 5px;
  align-items: center;
  margin-bottom: 5px;
  font-family: 'pretendard-bold';
`;

const headerContainerCss = css`
  display: flex;
  font-size: 16px;
  height: 26px;
  margin-left: 5px;
  align-items: center;
  margin-bottom: 5px;
  font-family: 'pretendard-bold';
`;

const AddPostBtnCss = css`
  height: 28px;
  margin-left: 10px;
  font-size: 14px;
`;

function AdminCommentPanel() {
  const categoryPost = useQuery<Post[], Error>({
    queryKey: ['category', 0],
    queryFn: () => getPostsByCategory(0),
  });

  const items = [
    {
      key: '1',
      label: '게시물 관리',
    },
    {
      key: '2',
      label: '댓글 관리',
    },
  ];

  //추가 modal + form 상태관리
  const [addPostModal, setAddPostModal] = useState(false);
  const [addPostForm] = Form.useForm();
  const [status, handleStatusChange] = useApiStatus();

  // const samplePost = [
  //   {
  //     postId: 18,
  //     categoryId: 7,
  //     postName: '좋아1111요 예제',
  //     postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
  //     postDate: '2024-10-10',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 19,
  //     categoryId: 7,
  //     postName: '좋아1111요 예제',
  //     postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
  //     postDate: '2024-10-10',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 20,
  //     categoryId: 1,
  //     postName: '좋아1111요 예제',
  //     postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
  //     postDate: '2024-10-10',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  //   {
  //     postId: 21,
  //     categoryId: 5,
  //     postName: '임시훈 발냄새 예제',
  //     postContentName: '이 게시물은 Spring Boot로 만든 CRUD 예제입니다.',
  //     postDate: '2024-10-10',
  //     postView: 0,
  //     likeCount: 0,
  //   },
  // ];
  return (
    <>
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
        }}
      >
        <Space>
          <div css={menuContainerCss}>관리자 메뉴</div>
          <DownOutlined />
        </Space>
      </Dropdown>
      <div css={headerContainerCss}>
        댓글 관리
        <Button css={AddPostBtnCss} onClick={() => setAddPostModal(true)}>
          댓글 추가
        </Button>
      </div>
      <BasicGrid
        data={addCategoryName(categoryPost.data || [])}
        columnDefs={adminColumnDef}
        defaultColDef={adminDefaultColDef}
        pagination={false}
        // isLoading={categoryPost.isLoading}
      />
      <BasicModal
        apiStatus={status}
        onStatusChange={handleStatusChange}
        form={[addPostForm]}
        open={addPostModal}
        close={() => setAddPostModal(false)}
        title="게시물 추가"
        okText="추가"
        cancelText="취소"
        confirmText="입력한 값으로 게시물을 추가하시겠습니까?"
      >
        <AddPostForm
          form={addPostForm}
          onStatusChange={handleStatusChange}
          close={() => setAddPostModal(false)}
        />
      </BasicModal>
    </>
  );
}

export { AdminCommentPanel };
