import { css } from '@emotion/react';
import { Button } from 'antd';
import { colorLight } from 'styles/colors';
import { ButtonProps } from 'antd/es/button';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  isMain?: boolean;
  children: React.ReactNode;
}

const buttonCss = (width: string) => css`
  width: ${width};
  height: 40px;
  background-color: ${colorLight.subBtnColor2};
  border-radius: 12px;
  margin-top: 10px;

  outline: none;
  &:focus {
    outline: none;
  }
`;

const buttonTextCss = css`
  color: ${colorLight.primaryColor};
  font-family: 'Lexend-Bold';
`;

function ColorButton({ width = '100%', children, ...props }: CustomButtonProps) {
  return (
    <Button css={buttonCss(width)} {...props}>
      <span css={buttonTextCss}>{children}</span>
    </Button>
  );
}

export { ColorButton };
