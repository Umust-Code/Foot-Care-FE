import { clientApi } from 'api/clientApi';
import { API_SIGNUP, API_SIGNIN } from 'api/constant';
import { Signup, Signin } from 'api/models/request';
import { SigninResponse } from 'api/models/response';

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

export { postSignup, postSignin };
