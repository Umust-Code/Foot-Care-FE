import '@emotion/react';
import { ColorPaletteType } from 'styles/colors';

// @emotion/react의 기본 Theme 인터페이스에 ColorPaletteType 속성이 포함되도록 확장
declare module '@emotion/react' {
  export interface Theme extends ColorPaletteType {}
}
