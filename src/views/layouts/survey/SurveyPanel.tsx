import { Button, Progress, Radio } from 'antd';
import { css } from '@emotion/react';
import { BackButton } from 'views/components/Button/BackButton';
import { colorLight } from 'styles/colors';
import { ConfigProvider } from 'antd';
import { antdRadioTheme } from 'styles/antdTheme';
import { DefaultButton } from 'views/components/Button/DefaultButton';

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
  justify-content: space-between;
`;

function SurveyPanel() {
  return (
    <ConfigProvider theme={antdRadioTheme}>
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
        <div css={buttonContainerCss}>
          <DefaultButton isMain={false} width="75px">
            이전
          </DefaultButton>
          <DefaultButton isMain={true} width="75px">
            다음
          </DefaultButton>
        </div>
      </div>
    </ConfigProvider>
  );
}

export { SurveyPanel };
