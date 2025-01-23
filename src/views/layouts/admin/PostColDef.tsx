import { ControlBtn } from './PostControlBtn';
const adminDefaultColDef = {
  cellStyle: {
    textAlign: 'center',
    alignContent: 'center',
    lineHeight: '24px',
  },
};

const adminColumnDef = [
  {
    field: 'postId',
    headerName: '게시글번호',
    minWidth: 80,
    flex: 1,
  },

  {
    field: 'categoryId',
    headerName: '카테고리ID',
    minWidth: 80,
    flex: 1,
  },
  {
    field: 'categoryName',
    headerName: '카테고리명',
    minWidth: 120,
    flex: 1,
  },

  {
    field: 'postName',
    headerName: '제목',
    minWidth: 120,
    flex: 0.8,
  },

  {
    field: 'postContentName',
    headerName: '내용',
    minWidth: 300,
    flex: 1.5,
  },

  {
    field: 'postDate',
    headerName: '작성날짜',
    minWidth: 100,
    flex: 0.7,
  },
  {
    field: 'postView',
    headerName: '조회수',
    minWidth: 70,
    flex: 0.7,
  },

  {
    field: 'likeCount',
    headerName: '좋아요 수',
    minWidth: 70,
    flex: 0.7,
  },
  {
    headerName: '제어',
    minWidth: 150,
    flex: 1.2,
    autoHeight: true,
    cellRenderer: (params: any) => <ControlBtn data={params.data} />,
  },
];

export { adminDefaultColDef, adminColumnDef };
