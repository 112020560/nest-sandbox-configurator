import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationEntity } from './entities/application.entity';
import { AES, enc } from 'crypto-js';
import {
  ConnectionString,
  ExtentedProperty,
  Procedure,
} from './entities/partial';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const application = this.toModel(createApplicationDto);
    await this.applicationRepository.save(application);
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }

  private toModel(applicationDto: CreateApplicationDto): ApplicationEntity {
    const newApplication = new ApplicationEntity();
    newApplication.ApplicationCode = applicationDto.ApplicationCode;
    newApplication.ApplicationId = applicationDto.ApplicationId;
    newApplication.ApplicationName = applicationDto.ApplicationName;
    newApplication.Description = applicationDto.Description;
    newApplication.DbUserName = applicationDto.DbUserName;
    newApplication.DbPassword = applicationDto.DbPassword;
    newApplication.IsEnable = applicationDto.IsEnable;
    newApplication.IsEditable = applicationDto.IsEditable;
    newApplication.ReqAprove = applicationDto.ReqAprove;
    const connectionArray = [];
    applicationDto.Connections.forEach((connection) => {
      const encrypt_password =
        connection.Password != null
          ? AES.encrypt(connection.Password, process.env.SECRETE_KEY).toString()
          : null;
      console.log('encrypt_password', encrypt_password);
      connectionArray.push(
        new ConnectionString(
          connection.Type,
          connection.ConnectionString,
          connection.ConnectionKey00,
          connection.ConnectionKey01,
          connection.ConnectionKey02,
          connection.HostName,
          connection.UserName,
          encrypt_password,
          connection.DataBase,
          connection.Port,
          connection.SSLMode,
        ),
      );
    });
    newApplication.Connections = connectionArray;
    const procedureArrya = [];
    applicationDto.Procedures.forEach((procedure) => {
      procedureArrya.push(
        new Procedure(
          procedure.Procedure,
          procedure.ProcedureKey,
          procedure.Parameters,
          procedure.Active,
          procedure.Trace,
        ),
      );
    });
    newApplication.Procedures = procedureArrya;
    const extentedArray = [];
    applicationDto.ExtendedProperties.forEach((prop) => {
      extentedArray.push(
        new ExtentedProperty(
          prop.Key00,
          prop.Key01,
          prop.Key02,
          prop.Value00,
          prop.Value01,
          prop.Value02,
          prop.NumericValue,
          prop.Description,
        ),
      );
    });
    newApplication.ExtendedProperties = extentedArray;
    newApplication.Country = applicationDto.Country;
    newApplication.AllowProcedure = applicationDto.AllowProcedure;

    return newApplication;
  }
}
