import { css } from '@emotion/react';
import { Carousel } from 'antd';
import { colorLight } from 'styles/colors';
import { ShoppingCard } from './ShoppingCard';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const carouselCss = css`
  width: 100%;
  max-width: 100vw;
  margin-top: 10px;
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

const recommendCss = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px;
`;

const titleCss = css`
  font-family: 'Pretendard-Bold';
  font-size: 22px;
`;

const UserRecommend = ({ name }: { name: string | undefined }) => {
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

      <div css={recommendCss}>
        <div css={titleCss}>{name}님을 위한 인기상품</div>
        <ShoppingCard />
      </div>
    </div>
  );
};

export { UserRecommend };
