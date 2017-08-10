import { IReportFilter } from './IFilter';
export interface IReport extends Object {

  id: number;

}


export interface IReportResponse extends Object {
  items: IReport[];
  filter?: IReportFilter;
}
