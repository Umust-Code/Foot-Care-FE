import { css } from '@emotion/react';
import { colorLight } from 'styles/colors';
const globalWrapperCss = css`
  width: 100vw;
  height: 100dvh;
  border-radius: 0px;
  overflow: hidden;
  background-color: ${colorLight.primaryBgColor};
`;

function MobileLayout({ children }: { children: React.ReactNode }) {
  return <div css={globalWrapperCss}>{children}</div>;
}

export { MobileLayout };
