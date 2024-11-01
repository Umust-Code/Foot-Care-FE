import { css } from '@emotion/react';
import { IoSearch } from 'react-icons/io5';
import { colorLight } from 'styles/colors';
import { Input } from 'antd';

const searchContainerCss = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: relative;
`;

const searchIconCss = css`
  position: absolute;
  left: 10px;
  z-index: 1;
`;

const searchInputCss = css`
  color: ${colorLight.primaryColor};
  background-color: ${colorLight.subBtnColor2};
  width: 100%;
  height: 50px;
  border-radius: 12px;
  padding-left: 40px;
  &&&&&&&&& .ant-input-css-var {
    --ant-input-active-shadow: none;
  }

  outline: none;
  &:focus {
    outline: none;
  }
`;

interface SearchInputProps {
  placeholder: string;
}

function SearchInput(props: SearchInputProps) {
  return (
    <div css={searchContainerCss}>
      <IoSearch size={24} css={searchIconCss} />
      <Input css={searchInputCss} placeholder={props.placeholder} />
    </div>
  );
}

export { SearchInput };
