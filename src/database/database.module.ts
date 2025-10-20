import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseConfigService } from './mongoose-config.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
