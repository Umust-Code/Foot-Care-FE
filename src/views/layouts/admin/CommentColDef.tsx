import { CommentControlBtn } from './CommentControlBtn';
const commentDefaultColDef = {
  cellStyle: {
    textAlign: 'center',
    alignContent: 'center',
    lineHeight: '24px',
  },
};

const commentColumnDef = [
  {
    field: 'commentId',
    headerName: '게시글번호',
    minWidth: 80,
    flex: 1,
  },

  {
    field: 'postId',
    headerName: '게시글번호',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'commentContent',
    headerName: '댓글 내용',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'commentDate',
    headerName: '작성날짜',
    minWidth: 100,
    flex: 0.7,
  },
  {
    field: 'memberId',
    headerName: '유저 번호',
    minWidth: 70,
    flex: 0.7,
  },
  {
    field: 'name',
    headerName: '유저 이름',
    minWidth: 70,
    flex: 0.7,
  },
  {
    headerName: '제어',
    minWidth: 70,
    flex: 0.7,
    autoHeight: true,
    cellRenderer: (params: any) => <CommentControlBtn data={params.data} />,
  },
];

export { commentDefaultColDef, commentColumnDef };
