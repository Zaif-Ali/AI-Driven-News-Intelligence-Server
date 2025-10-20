/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { Injectable, Logger } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { Connection } from 'mongoose';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { timezonePlugin } from './plugins/timezone.plugin';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongooseConfigService.name);

  constructor(private readonly configService: ApiConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      uri: this.configService.get('MONGODB_URI'),
      dbName: this.configService.get('MONGODB_DB_NAME'),
      user: this.configService.get('MONGODB_USER'),
      pass: this.configService.get('MONGODB_PASSWORD'),

      retryAttempts: 3,
      retryDelay: 3000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      autoIndex: process.env.NODE_ENV !== 'production',

      connectionFactory(connection): typeof connection {
        connection.plugin(mongooseAutoPopulate);
        connection.plugin(timezonePlugin);
        return connection;
      },

      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () =>
          this.logger.log('✅ MongoDB connected'),
        );
        connection.on('open', () => this.logger.log('🟢 Connection open'));
        connection.on('disconnected', () =>
          this.logger.warn('⚠️ MongoDB disconnected'),
        );
        connection.on('reconnected', () =>
          this.logger.log('🔁 MongoDB reconnected'),
        );
        connection.on('disconnecting', () =>
          this.logger.warn('🟡 MongoDB disconnecting...'),
        );
        return connection;
      },
    };
  }
}
