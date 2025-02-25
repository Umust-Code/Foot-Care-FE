import { css } from '@emotion/react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';
import { colorLight } from 'styles/colors';
import { Carousel } from 'antd';
import { HotContentCard } from './HotContentCard';
import { ColorButton } from 'views/components/Button/ColorButton';
import { getTopPosts } from 'api/requests/requestPost';
import { useQuery } from '@tanstack/react-query';
import { getUserAlreadySurvey } from 'api/requests/requestSurvey';
import { useNavigate } from 'react-router-dom';
import { useUserInfoStore } from 'stores/userStore';
import { useState } from 'react';
import { ConfirmModal } from 'views/components/Modal/ConfirmModal';

const containerCss = css`
  width: 100%;
  height: calc(100% - 52px);
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

const hotContentCss = css`
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

const hotContentListCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

const recordCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 15px;
`;

const recordTextContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const recordTextCss = css`
  color: ${colorLight.primaryColor};
  font-size: 14px;
  margin-top: 10px;
`;

function HomePanel() {
  const { userInfo } = useUserInfoStore();
  const navigate = useNavigate();

  const topPosts = useQuery({
    queryKey: ['topPosts'],
    queryFn: getTopPosts,
  });

  const alreadySurvey = useQuery({
    queryKey: ['alreadySurvey'],
    queryFn: () => getUserAlreadySurvey(userInfo.memberId),
  });

  const [surveyCancelModalOpen, setSurveyCancelModalOpen] = useState(false);

  const sampleContents = [
    {
      id: 1,
      title: '2024 풋케어 제품 랭킹 TOP 10',
    },
    {
      id: 2,
      title: '겨울철에도 걱정 NO! 풋케어 생활 습관',
    },
    {
      id: 3,
      title: '페디큐어는 언제마다 하는 것이 좋을까요?',
    },
    {
      id: 4,
      title: '족저근막염, 이런 경우 의심해봐야합니다입니다입니다입니다입니다.',
    },
  ];

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
        <span css={titleCss}>인기 게시물</span>
        <div css={hotContentListCss}>
          {topPosts.data?.map((content) => (
            <HotContentCard key={content.postId} title={content.postName} postId={content.postId} />
          ))}
        </div>
      </div>
      <div css={recordCss}>
        <span css={titleCss}>기록 하기</span>
        <ColorButton onClick={handleSurveyClick}>오늘의 풋케어 기록하기</ColorButton>
        <div css={recordTextContainerCss}>
          <span css={recordTextCss}>오늘의 발 컨디션은 어떠신가요? 관리 활동을 기록하세요.</span>
        </div>
      </div>
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

export { HomePanel };
