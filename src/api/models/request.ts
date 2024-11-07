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
