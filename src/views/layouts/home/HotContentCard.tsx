import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { IoArrowForward } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
interface HotContentCardProps {
  title: string;
  key: number;
}

const containerCss = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const contentImgCss = css`
  width: 40px;
  height: 40px;
  background-color: ${colorLight.pointColor};
  border-radius: 8px;
`;

const contentTitleCss = css`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 80px);
`;

function HotContentCard(props: HotContentCardProps) {
  const navigate = useNavigate();
  return (
    <div css={containerCss} onClick={() => navigate(`/post?postId=${props.key}`)}>
      <div css={contentImgCss} />
      <div css={contentTitleCss}>{props.title}</div>
      <IoArrowForward size={20} />
    </div>
  );
}

export { HotContentCard };
