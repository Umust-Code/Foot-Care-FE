import { css } from '@emotion/react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from 'stores/userStore';
import { getUserData } from 'api/requests/requestUser';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  align-items: center;
  gap: 10px;
`;

const myInfoCardCss = css`
  width: 100%;
  height: 80px;
  border-radius: 14px;
  background-color: #e8f2f0;
  padding: 15px;
  padding-left: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const nameCss = css`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
`;

const emailCss = css`
  font-size: 14px;
  color: #4f9487;
`;

const menuContainerCss = css`
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const menuTitleCss = css`
  font-family: 'Pretendard-Bold';
  width: 100%;
  font-size: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
`;

const menuListCss = css`
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
`;

const hrCss = css`
  width: 100%;
  height: 1px;
  background-color: #4f94874b;
`;

function MypagePanel() {
  const { userInfo } = useUserInfoStore();
  const navigate = useNavigate();

  const userData = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData(userInfo.memberId),
  });

  return (
    <div css={containerCss}>
      <div css={myInfoCardCss}>
        <IoPersonCircleSharp size={50} />
        <div>
          <div css={nameCss}>{userData.data?.name}님</div>
          <div css={emailCss}>{userData.data?.id}</div>
        </div>
      </div>

      <div css={menuContainerCss}>
        <div css={menuTitleCss}>풋케어 관리</div>
        <div css={hrCss} />
        <div css={menuListCss}>오늘의 풋케어 기록하기</div>
        <div css={hrCss} />
        <div css={menuListCss}>'좋아요'한 게시물</div>
        <div css={hrCss} />
        <div css={menuListCss}>족부질환 자가진단 설문조사</div>
        <div css={hrCss} />
      </div>

      <div css={menuContainerCss}>
        <div css={menuTitleCss}>쇼핑 관리</div>
        <div css={hrCss} />
        <div css={menuListCss}>찜 목록</div>
        <div css={hrCss} />
        <div css={menuListCss}>주문 목록 확인 및 배송 조회</div>
        <div css={hrCss} />
        <div css={menuListCss}>쿠폰 조회</div>
        <div css={hrCss} />
      </div>

      <div css={menuContainerCss}>
        <div css={menuTitleCss}>계정 관리</div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={() => navigate('/change-info')}>
          회원 정보 수정
        </div>
        <div css={hrCss} />
        <div css={menuListCss}>로그아웃</div>
        <div css={hrCss} />
        <div css={menuListCss}>회원 탈퇴</div>
        <div css={hrCss} />
      </div>
    </div>
  );
}

export { MypagePanel };
