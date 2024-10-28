import { theme, ThemeConfig } from 'antd';
import { colorLight } from './colors';

// antd 에서 제공하는 design token에 대한 커스텀

// light
const antdLightTheme: ThemeConfig = {
  cssVar: true,
  token: {
    fontSize: 16,
    colorPrimary: colorLight.primaryColor,
    colorBgContainer: colorLight.primaryBgColor,
    colorBorder: colorLight.primaryBorderColor,
    borderRadius: 6,
  },
  algorithm: theme.defaultAlgorithm,
};

const antdRadioTheme: ThemeConfig = {
  cssVar: true,
  token: {
    fontSize: 16,
    colorPrimary: colorLight.pointColor,
    colorBgContainer: colorLight.primaryBgColor,
    colorBorder: colorLight.primaryBorderColor,
    borderRadius: 12,
  },
  algorithm: theme.defaultAlgorithm,
};

export { antdLightTheme, antdRadioTheme };
