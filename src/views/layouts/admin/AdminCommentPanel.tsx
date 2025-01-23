import { css } from '@emotion/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import { postAllComments } from 'api/requests/requestPost';
import { Post, Comment } from 'api/models/response';
import { getCommentColumnDef, commentDefaultColDef } from './CommentColDef';
import { BasicGrid } from 'views/components/grid/BasicGrid';
import { addCategoryName } from './adminConverter';
import { Button, Form } from 'antd';
import { AddPostForm } from './AddPostForm';
import { useApiStatus } from 'hooks/useApiStatus';
import { BasicModal } from 'views/components/Modal/BasicModal';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography, Input } from 'antd';
import { debounce } from 'lodash';

const debounceSetSearch = debounce((setter, value) => {
  setter(value);
}, 500);

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

const searchContainerCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const searchInputContainerCss = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const inputCss = css`
  width: 150px;
  font-size: 14px;
  margin-left: 10px;
  height: 24px;
`;

function AdminCommentPanel() {
  const [memberId, setMemberId] = useState(0);
  const [commentContent, setCommentContent] = useState('');
  const { data } = useQuery<Comment[], Error>({
    queryKey: ['comments', memberId, commentContent],
    queryFn: () => postAllComments(memberId, commentContent),
  });

  const debouncedSearch = debounceSetSearch;

  const handleCommentContentSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setCommentContent('');
    } else {
      debouncedSearch(setCommentContent, e.target.value);
    }
  };

  const handleMemberIdSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMemberId(0);
    } else {
      debouncedSearch(setMemberId, parseInt(e.target.value) || 0);
    }
  };

  const sampleComment = [
    {
      commentId: 1,
      postId: 1,
      commentContent: '댓글이다',
      commentDate: '2025-01-04',
      memberId: 1,
      name: '관리자',
    },
    {
      commentId: 2,
      postId: 1,
      commentContent: '댓글이다',
      commentDate: '2025-01-04',
      memberId: 1,
      name: '관리자',
    },
    {
      commentId: 3,
      postId: 1,
      commentContent: '댓글이다111111',
      commentDate: '2025-01-04',
      memberId: 1,
      name: '관리자',
    },
    {
      commentId: 4,
      postId: 1,
      commentContent: '댓글이다111111',
      commentDate: '2025-01-04',
      memberId: 2,
      name: 'zz',
    },
    {
      commentId: 5,
      postId: 1,
      commentContent: '댓글이다11234111',
      commentDate: '2025-01-05',
      memberId: 2,
      name: 'zz',
    },
    {
      commentId: 6,
      postId: 2,
      commentContent: '안녕하세요',
      commentDate: '2025-01-05',
      memberId: 2,
      name: 'zz',
    },
    {
      commentId: 7,
      postId: 1,
      commentContent: '메롱',
      commentDate: '2025-01-05',
      memberId: 2,
      name: 'zz',
    },
  ];
  return (
    <>
      <div css={searchContainerCss}>
        <div css={headerContainerCss}>댓글 관리</div>
        <div css={searchInputContainerCss}>
          <div>
            <label htmlFor="commentContent">댓글 내용</label>
            <Input placeholder="댓글 내용" css={inputCss} onChange={handleCommentContentSearch} />
          </div>
          <div>
            <label htmlFor="memberId">회원 아이디</label>
            <Input placeholder="회원 아이디" css={inputCss} onChange={handleMemberIdSearch} />
          </div>
        </div>
      </div>
      <BasicGrid
        // data={sampleComment}
        data={data || []}
        columnDefs={getCommentColumnDef(memberId, commentContent)}
        defaultColDef={commentDefaultColDef}
        pagination={false}
        // isLoading={categoryPost.isLoading}
      />
    </>
  );
}

export { AdminCommentPanel };
