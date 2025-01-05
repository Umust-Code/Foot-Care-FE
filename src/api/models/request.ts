export interface Signup {
  id: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  sex: string;
}

export interface Signin {
  id: string;
  password: string;
}

export interface Category {
  categoryId: number;
}

export interface AddComment {
  commentContent: string;
}

export interface Survey {
  memberId: number;
  scores: { categoryId: number; score: number }[];
}

export interface ChangeInfo {
  name: string;
  phone: string;
  address: string;
}

export interface PutPost {
  categoryId: number;
  postName: string;
  postContentName: string;
  postDate: string;
  postView: number;
}

export interface AddPost {
  postId: number;
  categoryId: number;
  postName: string;
  postContentName: string;
  postDate: string;
  postView: number;
  likeCount: number;
}
