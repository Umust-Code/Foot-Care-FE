export interface Signup {
  id: string;
  password: string;
  name: string;
  phone: string;
  address: string;
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
