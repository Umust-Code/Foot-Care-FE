import { Progress, Radio } from 'antd';
import { css } from '@emotion/react';
import { BackButton } from 'views/components/BackButton';
import { colorLight } from 'styles/colors';

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
`;

const radioButtonCss = css`
  height: 50px;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 1px solid ${colorLight.pointColor};
  display: flex;
  align-items: center;
  padding: 0 15px;
  /* &.ant-radio-button-wrapper:first-child {
    border: 1px solid ${colorLight.pointColor};
  }
  &.ant-radio-button-wrapper::before {
    display: none;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #e6f7ff;
    border-color: #1890ff;
  } */
`;

function SurveyPanel() {
  return (
    <div css={containerCss}>
      <BackButton />
      <Progress
        showInfo={false}
        percent={25}
        strokeColor={colorLight.pointColor}
        css={progressCss}
      />
      <div css={questionNumberCss}>1번문항(전체 4문항)</div>
      <div css={questionTextCss}>불편함을 겪으신지 얼마나 되셨나요?</div>
      <Radio.Group css={radioGroupCss}>
        <Radio.Button value="1" css={radioButtonCss}>
          한 주 이내
        </Radio.Button>
        <Radio.Button value="2" css={radioButtonCss}>
          1-2 주
        </Radio.Button>
        <Radio.Button value="3" css={radioButtonCss}>
          3-4 주
        </Radio.Button>
        <Radio.Button value="4" css={radioButtonCss}>
          한 달 이상 지남
        </Radio.Button>
      </Radio.Group>
    </div>
  );
}

export { SurveyPanel };
