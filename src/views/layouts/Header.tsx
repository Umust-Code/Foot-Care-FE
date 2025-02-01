import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { colorLight } from 'styles/colors';

const headerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 10px;
`;

const backButtonCss = css`
  font-size: 24px;
  color: ${colorLight.txtColor};
`;

const titleCss = css`
  font-size: 24px;
  font-family: 'Pretendard-Bold';
`;

function Header({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} css={headerCss}>
      <ArrowLeftOutlined css={backButtonCss} />
      <span css={titleCss}>{title}</span>
      <div />
    </div>
  );
}

export { Header };
