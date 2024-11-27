import { css } from '@emotion/react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from 'stores/userStore';
import { getUserData } from 'api/requests/requestUser';
import { ConfirmModal } from 'views/components/Modal/confirmModal';
import { useState } from 'react';
import { deleteUser } from 'api/requests/requestUser';
import { requestSignout } from 'api/requests/requestAuth';
import { getUserAlreadySurvey } from 'api/requests/requestSurvey';

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

  const alreadySurvey = useQuery({
    queryKey: ['alreadySurvey'],
    queryFn: () => getUserAlreadySurvey(userInfo.memberId),
  });

  const [surveyCancelModalOpen, setSurveyCancelModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(userInfo.memberId),
    onSuccess: () => {
      setWithdrawalModalOpen(true);
    },
  });

  const closeLogoutModal = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    requestSignout();
    setLogoutModalOpen(false);
    navigate('/signin');
  };

  const handleWithdrawalConfirm = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    deleteUserMutation.mutate();
    requestSignout();
    setWithdrawalModalOpen(false);
    navigate('/signin');
  };

  const handleSurveyClick = () => {
    if (alreadySurvey.data) {
      const today = new Date().toISOString().split('T')[0];
      const hasTodaySurvey = alreadySurvey.data.includes(today);

      if (!hasTodaySurvey) {
        navigate('/survey');
      } else {
        setSurveyCancelModalOpen(true);
      }
    }
  };

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
        <div css={menuListCss} onClick={() => navigate('/line-chart')}>
          나의 풋케어
        </div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={() => navigate('/like')}>
          '좋아요'한 게시물
        </div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={handleSurveyClick}>
          족부질환 자가진단 설문조사
        </div>
        <div css={hrCss} />
      </div>
      {/* 
      <div css={menuContainerCss}>
        <div css={menuTitleCss}>쇼핑 관리</div>
        <div css={hrCss} />
        <div css={menuListCss}>찜 목록</div>
        <div css={hrCss} />
        <div css={menuListCss}>주문 목록 확인 및 배송 조회</div>
        <div css={hrCss} />
        <div css={menuListCss}>쿠폰 조회</div>
        <div css={hrCss} />
      </div> */}

      <div css={menuContainerCss}>
        <div css={menuTitleCss}>계정 관리</div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={() => navigate('/change-info')}>
          회원 정보 수정
        </div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={() => setLogoutModalOpen(true)}>
          로그아웃
        </div>
        <div css={hrCss} />
        <div css={menuListCss} onClick={() => setWithdrawalModalOpen(true)}>
          회원 탈퇴
        </div>
        <div css={hrCss} />
      </div>

      <ConfirmModal
        open={withdrawalModalOpen}
        onOk={handleWithdrawalConfirm}
        title="회원 탈퇴"
        confirmText="회원 탈퇴가 완료되었습니다."
        okText="확인"
      />

      <ConfirmModal
        open={logoutModalOpen}
        onOk={closeLogoutModal}
        title="로그아웃"
        confirmText="로그아웃이 완료되었습니다."
        okText="확인"
      />

      <ConfirmModal
        open={surveyCancelModalOpen}
        onOk={() => setSurveyCancelModalOpen(false)}
        title="설문조사"
        confirmText="오늘 이미 설문조사를 완료하였습니다."
        okText="확인"
      />
    </div>
  );
}

export { MypagePanel };
