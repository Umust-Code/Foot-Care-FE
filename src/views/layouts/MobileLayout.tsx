import { css } from '@emotion/react';

const globalWrapperCss = css`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  border-radius: 0px;
  overflow: hidden;
  background-color: #d1fdd3;
`;

function MobileLayout({ children }: { children: React.ReactNode }) {
  return <div css={globalWrapperCss}>{children}</div>;
}

export { MobileLayout };
