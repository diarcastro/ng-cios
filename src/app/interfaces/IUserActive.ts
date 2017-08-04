import { IPagination } from './IPagination';
import { IUsersActiveFilter } from './IFilter';

export interface IUserNote extends Object {
  id?: number;
  note: string;
  date?: number;
  closed?: boolean;
}

export interface IUserActive extends Object {
  id: number;
  hid?: number;
  name: string;
  qr?: string;
  headquarter_id?: number;
  headquarter_name?: string;
  dateIn: number;
  dateOut: number;
  avatar: string;
  saving?: boolean;
  notes?: IUserNote[];
}

export interface IUserActiveResponse {
  users: IUserActive[];
  filter?: IUsersActiveFilter;
}
