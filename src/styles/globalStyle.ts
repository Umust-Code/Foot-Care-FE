import { css } from '@emotion/react';

const globalCss = css`
  @font-face {
    font-family: 'Pretendard-Light';
    font-style: normal;
    src: url('/assets/Pretendard-Light.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard-Regular';
    font-style: normal;
    src: url('/assets/Pretendard-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    font-style: normal;
    src: url('/assets/Pretendard-Medium.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Pretendard-Bold';
    font-style: normal;
    src: url('/assets/Pretendard-Bold.woff2') format('woff2');
  }
  * {
    box-sizing: border-box; // padding 사이즈 포함하여 width, height 계산
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular';
  }
`;

const globalMobileCss = css`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  border-radius: 0px;
  overflow: hidden;
  background-color: white;
`;

export { globalCss, globalMobileCss };
