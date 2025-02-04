const BASE_URL = 'http://localhost:8080/api';

const API_SIGNUP = '/signup';
const API_SIGNIN = '/login';
const API_POSTS = '/posts';
const API_COMMENTS = '/comments';
const API_POSTS_CATEGORY = '/posts/category';
const API_POSTS_COMMENT = '/comments/post';
const API_COMMENTS_SEARCH = '/comments/search';
const API_SURVEY_SUBMIT = '/disease-survey/submit-scores';
const API_REFRESH = '/refresh-token';
const API_USERS = '/users';
const API_USERS_LIKE = '/posts/liked-by-user';
const API_SURVEYS = '/disease-survey/all-surveys';
const API_ALREADY_SURVEY = '/disease-survey/member';
const API_POSTS_TOP = '/posts/top-liked';
const API_CHECK_ID = '/users/check-id';
const API_USER_GENDER = '/users/users-by-gender';
const API_USER_TOTAL = '/users/total-users';
const API_USER_MONTHLY_SIGNUP = '/users/monthly-signups';
const API_PRODUCT = '/shopping/products';
const API_TOKEN_TEST = '/posts/token/test';

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
  API_CHECK_ID,
  API_COMMENTS_SEARCH,
  API_COMMENTS,
  API_USER_GENDER,
  API_USER_TOTAL,
  API_USER_MONTHLY_SIGNUP,
  API_PRODUCT,
  API_TOKEN_TEST,
};
