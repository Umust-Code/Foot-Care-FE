import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
import { IoArrowForward } from 'react-icons/io5';
interface HotContentCardProps {
  title: string;
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
  return (
    <div css={containerCss}>
      <div css={contentImgCss} />
      <div css={contentTitleCss}>{props.title}</div>
      <IoArrowForward size={20} />
    </div>
  );
}

export { HotContentCard };
