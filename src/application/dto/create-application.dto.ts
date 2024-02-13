import { ConnectionDto, ExtendedDto, ProcedureDto } from './partial';

export class CreateApplicationDto {
  ApplicationCode: number;
  ApplicationId: string;

  ApplicationName: string;

  Description: string;

  DbUserName: string;

  DbPassword: string;

  IsEnable: boolean;

  IsEditable: boolean;

  ReqAprove: boolean;

  Connections: ConnectionDto[];

  AllowProcedure: boolean;

  Procedures: ProcedureDto[];

  ExtendedProperties: ExtendedDto[];
  Country: number[];
}
