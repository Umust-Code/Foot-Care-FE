import { clientApi } from 'api/clientApi';

import { API_USER_GENDER, API_USER_TOTAL, API_USER_MONTHLY_SIGNUP } from 'api/constant';
import { UserGender } from 'api/models/response';

const getUserGender = async () => {
  try {
    const response = await clientApi.get<UserGender>(API_USER_GENDER);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
};

const getUserTotal = async () => {
  try {
    const response = await clientApi.get<number>(API_USER_TOTAL);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
};

const getUserMonthlySignup = async () => {
  try {
    const response = await clientApi.get<any>(API_USER_MONTHLY_SIGNUP);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
};

export { getUserGender, getUserTotal, getUserMonthlySignup };
