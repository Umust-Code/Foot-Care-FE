import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { colorLight } from 'styles/colors';

const backButtonCss = css`
  font-size: 24px;
  position: absolute;
  z-index: 1000;
  top: 40px;
  left: 10px;
  color: ${colorLight.txtColor};
`;

function BackButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)}>
      <ArrowLeftOutlined css={backButtonCss} />
    </div>
  );
}

export { BackButton };
