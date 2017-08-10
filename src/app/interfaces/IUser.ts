import { IHeadquarter } from './IHeadquarter';

export interface IUserPermissions {
  admin: boolean;
  options: boolean;
  qr_fix: boolean;
  headquarter: boolean;
  staff: boolean;
  checkoutbatch: boolean;
  reports: boolean;
  create: boolean;
}

export interface IUser {
  id: number;
  name: string;
  avatar?: string;
  permissions: IUserPermissions;
  headquarter?: IHeadquarter;
}

export interface IUserResponse {
  user: IUser;
  headquarters?: IHeadquarter[];
  fix?: number;
}
