import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { TimeService } from './services/time.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [ApiConfigService, TimeService],
  exports: [ApiConfigService, TimeService, HttpModule],
})
export class SharedModule {}
