import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable({})
export class MongoDbConfigService {
  constructor(private configSrvice: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: this.configSrvice.get<string>('MONGO_URL'),
      autoLoadEntities: true,
    };
  }
}
