import { css } from '@emotion/react';
import { Carousel } from 'antd';
import { colorLight } from 'styles/colors';
import { ShoppingCard } from './ShoppingCard';
import { getProduct } from 'api/requests/requestShopping';
import { getToken } from 'api/requests/requestPost';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Product } from 'api/models/response';

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
  const { data, isLoading } = useQuery({
    queryKey: ['groupProduct'],
    queryFn: () => getProduct(),
  });

  const reqToken = useMutation({
    mutationFn: () => getToken(),
  });

  const getProductHandler = () => {
    console.log('상품 요청');
    // reqProduct.mutate();
  };
  const getTokenHandler = () => {
    console.log('토큰 발급 요청 시작');
    reqToken.mutate(undefined, {
      onSuccess: (data) => {
        console.log('토큰 발급 성공:', data);
      },
      onError: (error) => {
        console.error('토큰 발급 실패:', error);
      },
    });
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

      <div css={recommendCss}>
        <div css={titleCss}>{name}님을 위한 인기상품</div>
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          data?.groupProduct?.specificProducts.map((product) => <ShoppingCard product={product} />)
        )}
      </div>
      {/* <button onClick={getTokenHandler}>토큰발급</button>
      <button onClick={getProductHandler}>상품 요청</button> */}
    </div>
  );
};

export { UserRecommend };
