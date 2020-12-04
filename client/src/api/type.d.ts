export declare interface obj {
  [key: string]: any
}

export declare interface Result<T = any> {
  msg: string;
  data?: T;
  status: number;
}

export declare interface UserLoginResp<T = obj> {
  token: string;
  userInfo: T;
}
