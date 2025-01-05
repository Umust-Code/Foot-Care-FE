export interface SignupResponse {
  message: string;
}

export interface Post {
  postId: number;
  categoryId: number;
  postName: string;
  postContentName: string;
  postDate: string;
  postView: number;
  likeCount: number;
}

export interface Comment {
  commentId: number;
  postId: number;
  commentContent: string;
  commentDate: string;
  name: string;
}
export interface SigninResponse {
  accessToken: string;
  refreshToken: string;
  isSurveyCompleted: 'N' | 'Y';
  memberId: number;
  fg: string;
}

export interface UserDataResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface SurveyScore {
  scores: {
    date: string;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d5: number;
    d6: number;
  }[];
}
