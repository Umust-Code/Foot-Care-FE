import { css } from '@emotion/react';
import { StarFilled } from '@ant-design/icons';

const containerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 210px;
  background-color: #ff9b9b;
`;

const titleCss = css`
  padding: 4px 2px;

  font-family: 'Pretendard-Medium';
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: keep-all;
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
  product: any;
}

const ShoppingCard = (props: ShoppingCardProps) => {
  const { product } = props;
  return (
    <div css={containerCss}>
      <div
        css={css`
          background-color: #9bffbc;
          width: 120px;
          height: 120px;
        `}
      />
      <div css={titleCss}>{product.originProduct.name}</div>
      <div css={bodyCss}>
        <div css={priceCss}>20%</div>
        <div css={discountCss}>{product.originProduct.salePrice}원 </div>
      </div>
      <div css={bodyCss}>
        <div>
          <StarFilled css={starCss} />
        </div>
        <div css={starRateCss}>4.5(120) </div>
      </div>
    </div>
  );
};

export { ShoppingCard };
