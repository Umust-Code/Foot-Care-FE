import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { useNavigate } from 'react-router-dom';
const containerCss = css`
  width: 100%;
  height: 130px;
  border: 1px solid ${colorLight.borderColor};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const contentContainerCss = css`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

const titleCss = css`
  font-size: 16px;
  color: ${colorLight.txtColor};
`;

const likeCss = css`
  padding: 5px 0;
  font-size: 12px;
  color: ${colorLight.primaryColor};
`;

const moreCss = css`
  font-size: 14px;
  border-radius: 12px;
  background-color: ${colorLight.subBtnColor2};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100px;
  color: ${colorLight.txtColor};
`;

interface ContentCardProps {
  title: string;
  like: number;
  key: number;
  postId: number;
}

function ContentCard(props: ContentCardProps) {
  const navigate = useNavigate();
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div css={containerCss} onClick={() => navigate(`/post?postId=${props.postId}`)}>
      <div css={contentContainerCss}>
        <div css={titleCss}>
          {props.title}
          <div css={likeCss}>좋아요 {formatNumber(props.like)}개</div>
        </div>
        <div css={moreCss}>자세히 보기</div>
      </div>
      <div>
        <div
          style={{
            width: '119px',
            height: '113px',
            backgroundColor: colorLight.primaryColor,
            borderRadius: '12px',
          }}
        />
      </div>
    </div>
  );
}

export { ContentCard };
