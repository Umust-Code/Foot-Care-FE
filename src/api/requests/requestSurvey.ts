import { clientApi } from 'api/clientApi';
import { API_SURVEY_SUBMIT, API_USERS, API_SURVEYS } from 'api/constant';
import { Survey } from 'api/models/request';
import { SurveyScore } from 'api/models/response';

async function submitSurvey(survey: Survey) {
  try {
    const res = await clientApi.post(API_SURVEY_SUBMIT, survey);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function completeSurvey(memberId: number) {
  try {
    const res = await clientApi.post(`${API_USERS}/${memberId}/complete-survey`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getSurveyData(memberId: number) {
  try {
    const res = await clientApi.get<SurveyScore>(`${API_SURVEYS}/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export { submitSurvey, completeSurvey, getSurveyData };
