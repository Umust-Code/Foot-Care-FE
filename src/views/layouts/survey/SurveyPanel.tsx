import { Button, Progress, Radio } from 'antd';
import { useState } from 'react';
import { css } from '@emotion/react';
import { BackButton } from 'views/components/Button/BackButton';
import { colorLight } from 'styles/colors';
import { ConfigProvider } from 'antd';
import { antdRadioTheme } from 'styles/antdTheme';
import { DefaultButton } from 'views/components/Button/DefaultButton';
import { useMutation } from '@tanstack/react-query';
import { submitSurvey } from 'api/requests/requestSurvey';
import { calculateScores } from './surveyConverter';

const progressCss = css`
  margin-top: 50px;
  width: 100%;
`;

const containerCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow: auto;
  .ant-form-item {
    margin-bottom: 0px;
  }
  padding: 20px;
`;

const questionNumberCss = css`
  text-align: left;
  font-size: 16px;
  width: 100%;
  color: #4f9487;
`;

const questionTextCss = css`
  text-align: left;
  margin-top: 30px;
  font-size: 24px;
  width: 100%;
  font-family: 'Lexend-Bold';
`;

const radioGroupCss = css`
  width: 100%;
  margin-top: 20px;
  && .ant-radio-button-wrapper::before {
    display: none;
  }
`;

const radioButtonCss = css`
  height: 50px;
  margin-bottom: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border: 1px solid ${colorLight.primaryBorderColor};
  color: ${colorLight.txtColor};
`;

const buttonContainerCss = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

function SurveyPanel() {
  const [surveyPercent, setSurveyPercent] = useState(1);
  const [answers, setAnswers] = useState<number[]>(new Array(24).fill(0));

  const submitSurveyMutation = useMutation({
    mutationFn: () => submitSurvey({ memberId: 1, scores: calculateScores(answers) }),
    onSuccess: () => {
      console.log('성공');
    },
  });

  const surveyQuestion = [
    '아침에 일어났을 때 첫걸음이 아프거나 발바닥에 통증을 느끼십니까?',
    '발바닥 또는 발 뒤꿈치에 날카로운 통증이 있습니까?',
    '오래 서 있거나 걸은 후 발바닥의 통증이 심해지십니까?',
    '발 아치 부분에 피로감을 느끼십니까?',
    '하루 중 특히 저녁에 발목이나 발이 붓는 경우가 있습니까?',
    '다리에 무거움이나 불편감을 느끼십니까?',
    '오랫동안 서 있거나 앉아 있을 때 발이 붓는 경향이 있습니까?',
    '혈관이 튀어나와 보이거나 정맥류 증상이 있습니까?',
    '당뇨병 진단을 받으신 적이 있습니까?',
    '발에 상처가 생기기 쉬우며, 치유 속도가 느린 편입니까?',
    '발에 무감각함이나 따끔거림, 또는 타는 듯한 통증을 경험하십니까?',
    '발의 피부가 건조하거나 갈라지며 감염된 적이 있습니까?',
    '발가락 사이에 가려움이나 벗겨짐이 있습니까?',
    '발에서 악취가 나는 편입니까?',
    '발이 쉽게 땀이 나며, 습기가 차는 느낌을 받습니까?',
    '발 피부가 붉거나 벗겨지는 증상이 있습니까?',
    '발목이 자주 접질리거나 불안정한 느낌을 받습니까?',
    '걸을 때 발목에 통증이나 불편함이 있습니까?',
    '운동 중 발목을 다친 적이 있습니까?',
    '발목이 부은 적이 있거나 발목 주위가 자주 불편합니까?',
    '발뒤꿈치에 지속적인 통증을 느끼십니까?',
    '발뒤꿈치에 체중을 실을 때 아프십니까?',
    '딱딱한 바닥에서 오랫동안 서 있을 때 발뒤꿈치에 통증이 있습니까?',
    '발 뒤꿈치에 피부 굳음이나 갈라짐이 있습니까?',
  ];

  const handleAnswerChange = (e: any) => {
    const newAnswers = [...answers];
    newAnswers[surveyPercent - 1] = e.target.value;
    setAnswers(newAnswers);
  };

  const handlePrevClick = () => {
    setSurveyPercent((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setSurveyPercent((prev) => prev + 1);
  };

  const handleSubmitClick = () => {
    submitSurveyMutation.mutate();
  };

  return (
    <ConfigProvider theme={antdRadioTheme}>
      <div css={containerCss}>
        <BackButton />
        <Progress
          showInfo={false}
          percent={(surveyPercent / 24) * 100}
          strokeColor={colorLight.pointColor}
          css={progressCss}
        />
        <div css={questionNumberCss}>{surveyPercent}번문항(전체 24문항)</div>
        <div css={questionTextCss}>{surveyQuestion[surveyPercent - 1]}</div>
        <Radio.Group
          css={radioGroupCss}
          onChange={handleAnswerChange}
          value={answers[surveyPercent - 1]}
        >
          <Radio.Button value={1} css={radioButtonCss}>
            전혀 아니다
          </Radio.Button>
          <Radio.Button value={2} css={radioButtonCss}>
            아니다
          </Radio.Button>
          <Radio.Button value={3} css={radioButtonCss}>
            보통이다
          </Radio.Button>
          <Radio.Button value={4} css={radioButtonCss}>
            그렇다
          </Radio.Button>
          <Radio.Button value={5} css={radioButtonCss}>
            매우 그렇다
          </Radio.Button>
        </Radio.Group>
        <div css={buttonContainerCss}>
          {surveyPercent > 1 && (
            <DefaultButton isMain={false} width="75px" onClick={handlePrevClick}>
              이전
            </DefaultButton>
          )}
          {surveyPercent !== 24 ? (
            <DefaultButton
              isMain={true}
              width="75px"
              onClick={handleNextClick}
              disabled={!answers[surveyPercent - 1]}
            >
              다음
            </DefaultButton>
          ) : (
            <DefaultButton
              isMain={true}
              width="75px"
              onClick={handleSubmitClick}
              disabled={!answers[surveyPercent - 1]}
            >
              제출
            </DefaultButton>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export { SurveyPanel };
