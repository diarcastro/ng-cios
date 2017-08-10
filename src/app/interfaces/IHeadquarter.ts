import { IHeadquarterFilter } from './IFilter';

export interface IHeadquarter extends Object {
  id?: number;
  name: string;
  state?: number;
  created_at?: number;
  created_by?: string;
  updated_at?: string | number;
  saving?: boolean;
  editing?: boolean;
}

export interface IHeadquarterResponse {
  headquarters: IHeadquarter[];
  filter: IHeadquarterFilter;
}
