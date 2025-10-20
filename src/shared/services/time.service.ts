import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class TimeService {
  constructor(private readonly config: ApiConfigService) {}

  private get defaultTz(): string {
    return this.config.defaultTimezone;
  }

  private get localFormat(): string {
    return this.config.get('LOCAL_TIME_FORMAT');
  }

  now(timezone?: string) {
    const tz = timezone || this.defaultTz;
    const now = moment.tz(tz);

    return {
      utc: now.utc().toISOString(),
      local: now.format(this.localFormat),
      timezone: tz,
    };
  }

  toUTC(date: Date, timezone?: string): string {
    const tz = timezone || this.defaultTz;
    return moment.tz(date, tz).utc().format();
  }

  toLocal(date: Date, timezone?: string): string {
    const tz = timezone || this.defaultTz;
    return moment(date).tz(tz).format(this.localFormat);
  }

  listTimezones(): string[] {
    return moment.tz.names();
  }
}
