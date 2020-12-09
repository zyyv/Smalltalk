export interface obj {
  [key: string]: any
}

export interface Result<T = any> {
  msg: string;
  data?: T;
  status: number;
}

export interface UserLoginResp<T = obj> {
  token: string;
  userInfo: T;
}

export interface Sms {
  phone: string
}
export interface Login {
  phone: string;
  code?: string;
  pwd?: string;
  type: 'I' | 'II';
  remember?: boolean;
}

export interface PostLike {
  postId: string
}

