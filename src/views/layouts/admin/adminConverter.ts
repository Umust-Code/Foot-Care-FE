import { Post } from 'api/models/response';

type DiagnosisCode = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6';

function convertDiagnosis(code: DiagnosisCode): string {
  const mapping = {
    d1: '족저근막염',
    d2: '발부종',
    d3: '당뇨병성 발',
    d4: '발 뒤꿈치 통증',
    d5: '무좀(발냄새)',
    d6: '발목 염좌',
  } as const;

  return mapping[code] || '알 수 없는 코드';
}

const categoryMapping: { [key: number]: string } = {
  1: '족저근막염',
  2: '발부종',
  3: '당뇨병성 발',
  4: '발 뒤꿈치 통증',
  5: '무좀(발냄새)',
  6: '발목 염좌',
  7: '생활 습관',
  8: '건강 정보',
  9: '제품 추천',
  10: '체험단/리뷰',
};

// categoryName을 추가하는 함수
function addCategoryName(posts: Post[]) {
  return posts.map((post) => ({
    ...post, // 기존 데이터 유지
    categoryName: categoryMapping[post.categoryId] || '알 수 없는 카테고리',
  }));
}

export { convertDiagnosis, addCategoryName };
