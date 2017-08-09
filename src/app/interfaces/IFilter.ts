import { IPagination } from './IPagination';

export interface IGenericFilter {
  search?: string;
  pagination?: IPagination;
}

export interface IUsersActiveFilter extends IGenericFilter {
  headquarter?: number;
}


export interface IHeadquarterFilter extends IGenericFilter {
  state?: number | string;
}

export interface IStaffFilter extends IGenericFilter {
  headquarter_id?: number | string;
}
