import { IStaffFilter } from './IFilter';

export interface IStaff extends Object {
  id: number;
  name: string;
  username: string;
  email: string;
  updated_at?: number;
  headquarter_id?: number;
  headquarter_name?: string;
}


export interface IStaffResponse extends Object {
  items: IStaff[];
  filter: IStaffFilter;
}
