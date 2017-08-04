import { IPagination } from './IPagination';

export class IUsersActiveFilter {
  search: string;
  headquarter?: number;
  pagination?: IPagination;
}


export interface IHeadquarterFilter {
  search: string;
  state?: number;
  pagination?: IPagination;
}
