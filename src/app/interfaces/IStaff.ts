import { IStaffFilter } from './IFilter';

export interface IStaff {
  id: number;
  name: string;
  username: string;
  email: string;
  headquarter_id?: number;
  headquarter_name?: string;
}


export interface IStaffResponse {
  items: IStaff[];
  filter: IStaffFilter;
}
