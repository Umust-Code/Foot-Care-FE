import { css } from '@emotion/react';
import { StarFilled } from '@ant-design/icons';
import { Product } from 'api/models/response';

const containerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 205px;
  background-color: #e9f3ea;
  border-radius: 5px;
`;

const titleCss = css`
  padding: 4px 4px;

  font-family: 'Pretendard-Medium';
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  line-height: 16px;
  overflow: hidden;
  height: 38px;
`;

const bodyCss = css`
  padding: 0px 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  gap: 5px;
`;

const priceCss = css`
  font-family: 'Pretendard-Bold';
  color: #e61328;
`;

const originalPriceCss = css`
  font-family: 'Pretendard-Medium';
  font-size: 12px;
  color: #919191;
  text-decoration: line-through;
  padding: 0 2px;
`;

const discountCss = css`
  font-family: 'Pretendard-Bold';
  color: #000000;
`;

const starCss = css`
  color: #83848b;
`;

const starRateCss = css`
  color: #83848b;
`;

interface ShoppingCardProps {
  product: Product;
}

const ShoppingCard = (props: ShoppingCardProps) => {
  function calculateDiscount(
    originalPrice: number,
    discountAmount: number,
  ): { discountRate: number; finalPrice: number } {
    if (originalPrice || discountAmount) {
      return { discountRate: 0, finalPrice: 0 };
    }
    // 최종 가격 계산 (원래 가격 - 할인 금액)
    const finalPrice = originalPrice - discountAmount;

    // 할인율 계산 (할인금액 / 원래가격 * 100)
    const discountRate = Math.round((discountAmount / originalPrice) * 100);

    return {
      discountRate, // 할인율 (%)
      finalPrice, // 최종 가격
    };
  }

  const { product } = props;
  const { discountRate, finalPrice } = calculateDiscount(
    product.salePrice,
    product.immediateDiscountPolicy?.discountMethod?.value || 0,
  );
  return (
    <div css={containerCss}>
      <img
        src={product.images.representativeImage.url}
        alt={product.productName}
        css={css`
          width: 120px;
          height: 120px;
        `}
      />
      <div css={titleCss}>{product.productName}</div>
      <div css={originalPriceCss}>{product.salePrice.toLocaleString()}원</div>
      <div css={bodyCss}>
        <div css={priceCss}>{discountRate}%</div>
        <div css={discountCss}>{finalPrice.toLocaleString()}원 </div>
      </div>
      {/* <div css={bodyCss}>
        <div>
          <StarFilled css={starCss} />
        </div>
        <div css={starRateCss}>4.5(120) </div>
      </div> */}
    </div>
  );
};

export { ShoppingCard };
