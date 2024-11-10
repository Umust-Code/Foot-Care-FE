import { clientApi } from 'api/clientApi';
import { API_SURVEY_SUBMIT } from 'api/constant';
import { Survey } from 'api/models/request';

async function submitSurvey(survey: Survey) {
  try {
    const res = await clientApi.post(API_SURVEY_SUBMIT, survey);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export { submitSurvey };
