import { clientApi } from 'api/clientApi';
import { API_SIGNUP, API_SIGNIN, API_USERS, API_CHECK_ID } from 'api/constant';
import { Signup, Signin, ChangeInfo } from 'api/models/request';
import { SigninResponse, UserDataResponse } from 'api/models/response';

async function postSignup(data: Signup) {
  try {
    const res = await clientApi.post(API_SIGNUP, data);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function postSignin(data: Signin): Promise<SigninResponse> {
  try {
    const res = await clientApi.post<SigninResponse>(API_SIGNIN, data);
    if (res.status !== 200) throw new Error(`Unexpected status code: ${res.status}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getUserData(memberId: number) {
  try {
    const res = await clientApi.get<UserDataResponse>(`${API_USERS}/${memberId}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function putChangeInfo(memberId: number, data: ChangeInfo) {
  try {
    const res = await clientApi.put(`${API_USERS}/${memberId}/update`, data);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function deleteUser(memberId: number) {
  try {
    const res = await clientApi.delete(`${API_USERS}/${memberId}/delete`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

async function getCheckId(id: string) {
  try {
    const res = await clientApi.get<'Y' | 'N'>(`${API_CHECK_ID}?id=${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '문제 발생');
  }
}

export { postSignup, postSignin, getUserData, putChangeInfo, deleteUser, getCheckId };
