import { css } from '@emotion/react';

const globalCss = css`
  @font-face {
    font-family: 'Lexend-Light';
    font-style: normal;
    src: url('/assets/Lexend-Light.ttf');
  }
  @font-face {
    font-family: 'Lexend-Regular';
    font-style: normal;
    src: url('/assets/Lexend-Regular.ttf');
  }
  @font-face {
    font-family: 'Lexend-Medium';
    font-style: normal;
    src: url('/assets/Lexend-Medium.ttf');
  }
  @font-face {
    font-family: 'Lexend-Bold';
    font-style: normal;
    src: url('/assets/Lexend-Bold.ttf');
  }
  * {
    box-sizing: border-box; // padding 사이즈 포함하여 width, height 계산
    margin: 0;
    padding: 0;
    font-family: 'Lexend-Regular';
  }
  html,
  body,
  #root {
    height: 100%;
    min-height: -webkit-fill-available;
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
