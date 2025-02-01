import { css } from '@emotion/react';
import { StarFilled } from '@ant-design/icons';
import { getProduct } from 'api/requests/requestPost';
import { useMutation } from '@tanstack/react-query';
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

const ShoppingCard = () => {
  const reqProduct = useMutation({
    mutationFn: () => getProduct(),
  });
  const getProductHandler = () => {
    console.log('상품 요청');
    reqProduct.mutate();
  };
  return (
    <div css={containerCss}>
      <div
        css={css`
          background-color: #9bffbc;
          width: 120px;
          height: 120px;
        `}
      />
      <div css={titleCss}>온더바디 발을 씻자 프레쉬 레몬 민트 코튼 풋샴푸</div>
      <div css={bodyCss}>
        <div css={priceCss}>20%</div>
        <div css={discountCss}>12500원 </div>
      </div>
      <div css={bodyCss}>
        <div>
          <StarFilled css={starCss} />
        </div>
        <div css={starRateCss}>4.5(120) </div>
      </div>
      <button onClick={getProductHandler}>상품 요청</button>
    </div>
  );
};

export { ShoppingCard };
