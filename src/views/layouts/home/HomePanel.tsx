import { css } from '@emotion/react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';
import { colorLight } from 'styles/colors';
import { Carousel } from 'antd';
import { HotContentCard } from './HotContentCard';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const carouselCss = css`
  width: 100%;
  max-width: 600px;

  .slick-slide {
    text-align: center;
    background: ${colorLight};
    height: 200px;
    line-height: 200px;
  }
`;

const carouselItemCss = css`
  background: ${colorLight.pointColor};
`;

const hotContentCss = css``;

const hotContentTitleCss = css`
  font-family: 'Lexend-Bold';
  font-size: 22px;
`;

function HomePanel() {
  const handleLogout = () => {
    requestSignout();
  };
  return (
    <div css={containerCss}>
      <Carousel draggable css={carouselCss}>
        <div css={carouselItemCss}>
          <h3>1</h3>
        </div>
        <div css={carouselItemCss}>
          <h3>2</h3>
        </div>
        <div css={carouselItemCss}>
          <h3>3</h3>
        </div>
        <div css={carouselItemCss}>
          <h3>4</h3>
        </div>
      </Carousel>
      <div css={hotContentCss}>
        <span css={hotContentTitleCss}>인기 게시물</span>
        <HotContentCard />
      </div>
      <Button icon={<LogoutOutlined />} onClick={handleLogout} />
      <span>홈페이지</span>
    </div>
  );
}

export { HomePanel };
