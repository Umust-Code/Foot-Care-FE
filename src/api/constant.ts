const BASE_URL = 'http://localhost:8080/api';

const API_SIGNUP = '/signup';
const API_SIGNIN = '/login';
const API_POSTS = '/posts';
const API_POSTS_CATEGORY = '/posts/category';
const API_POSTS_COMMENT = '/comments/post';
const API_SURVEY_SUBMIT = '/disease-survey/submit-scores';
const API_REFRESH = '/refresh-token';
const API_USERS = '/users';
const API_USERS_LIKE = '/posts/liked-by-user';
const API_SURVEYS = '/disease-survey/all-surveys';
const API_ALREADY_SURVEY = '/disease-survey/member';
const API_POSTS_TOP = '/posts/top-liked';
// 토큰이 필요없는 API 경로들
export const PUBLIC_PATHS = [API_SIGNUP, API_SIGNIN];

export {
  BASE_URL,
  API_SIGNUP,
  API_SIGNIN,
  API_POSTS,
  API_POSTS_CATEGORY,
  API_POSTS_COMMENT,
  API_SURVEY_SUBMIT,
  API_REFRESH,
  API_USERS,
  API_USERS_LIKE,
  API_SURVEYS,
  API_ALREADY_SURVEY,
  API_POSTS_TOP,
};
