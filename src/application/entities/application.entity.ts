import { Entity, ObjectId, ObjectIdColumn, Column, Unique } from 'typeorm';
import { ConnectionString, ExtentedProperty, Procedure } from './partial';

@Entity('Application')
@Unique(['ApplicationId'])
export class ApplicationEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  ApplicationId: string;
  @Column()
  ApplicationCode: number;
  @Column()
  ApplicationName: string;
  @Column()
  Description: string;
  @Column()
  DbUserName: string;
  @Column()
  DbPassword: string;
  @Column()
  IsEnable: boolean;
  @Column()
  IsEditable: boolean;
  @Column()
  ReqAprove: boolean;
  @Column(() => ConnectionString)
  Connections: ConnectionString[];
  @Column()
  AllowProcedure: boolean;
  @Column(() => Procedure)
  Procedures: Procedure[];
  @Column(() => ExtentedProperty)
  ExtendedProperties: ExtentedProperty[];
  @Column()
  Country: number[];
}
