import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envT } from 'src/types/env.types';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }

  get appName(): string {
    return this.get('APPLICATION_NAME');
  }

  get defaultTimezone(): string {
    return this.get('DEFAULT_TIMEZONE') || 'UTC';
  }

  get<K extends keyof envT>(key: K): envT[K] {
    const value = this.configService.get<envT[K]>(key);
    if (value === undefined) {
      throw new Error(`Missing config value for: ${key}`);
    }
    return value;
  }
}
