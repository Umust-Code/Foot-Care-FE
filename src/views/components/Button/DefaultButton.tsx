import { css } from '@emotion/react';
import { Button } from 'antd';
import { colorLight } from 'styles/colors';
import { ButtonProps } from 'antd/es/button';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  isMain?: boolean;
  children: React.ReactNode;
}

const buttonCss = (width: string, isMain: boolean) => css`
  width: ${width};
  height: 40px;
  background-color: ${isMain ? colorLight.pointColor : colorLight.subBtnColor};
  border-radius: 12px;

  outline: none;
  &:focus {
    outline: none;
  }
`;

const buttonTextCss = css`
  color: ${colorLight.txtColor};
  font-family: 'Pretendard-Bold';
`;

function DefaultButton({ width = '100%', isMain = false, children, ...props }: CustomButtonProps) {
  return (
    <Button css={buttonCss(width, isMain)} {...props}>
      <span css={buttonTextCss}>{children}</span>
    </Button>
  );
}

export { DefaultButton };
