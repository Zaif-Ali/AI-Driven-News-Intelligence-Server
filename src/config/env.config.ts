import { envT } from 'src/types/env.types';

export const envConfiguration = (): envT => ({
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT as string),
  APPLICATION_NAME: process.env.APPLICATION_NAME as string,
  API_PREFIX: process.env.API_PREFIX as string,
  SWAGGER_API_PATH: process.env.SWAGGER_API_PATH as string,
  CORS_ORIGINS: process.env.CORS_ORIGINS as string,
  // Throttler Rate limiter config
  RATE_LIMITER_LIMIT: Number(process.env.RATE_LIMITER_LIMIT as string),
  RATE_LIMITER_TTL: Number(process.env.RATE_LIMITER_TTL as string),
  // MongoDB config
  MONGODB_URI: process.env.MONGODB_URI as string,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME as string,
  MONGODB_USER: process.env.MONGODB_USER as string,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD as string,
  // Timezone config
  DEFAULT_TIMEZONE: process.env.DEFAULT_TIMEZONE as string,
  LOCAL_TIME_FORMAT: process.env.LOCAL_TIME_FORMAT as string,
  // n8n config
  N8N_BASIC_AUTH_ACTIVE: process.env.N8N_BASIC_AUTH_ACTIVE === 'true',
  N8N_BASIC_AUTH_USER: process.env.N8N_BASIC_AUTH_USER as string,
  N8N_BASIC_AUTH_EMAIL: process.env.N8N_BASIC_AUTH_EMAIL as string,
  N8N_BASIC_AUTH_PASSWORD: process.env.N8N_BASIC_AUTH_PASSWORD as string,
  N8N_PORT: Number(process.env.N8N_PORT as string),
  N8N_PROTOCOL: process.env.N8N_PROTOCOL as string,
  N8N_HOST: process.env.N8N_HOST as string,
  N8N_PATH: process.env.N8N_PATH as string,
  N8N_EDITOR_BASE_URL: process.env.N8N_EDITOR_BASE_URL as string,
  N8N_ENCRYPTION_KEY: process.env.N8N_ENCRYPTION_KEY as string,
  N8N_DIAGNOSTICS_ENABLED: process.env.N8N_DIAGNOSTICS_ENABLED === 'true',
  N8N_PERSONALIZATION_ENABLED:
    process.env.N8N_PERSONALIZATION_ENABLED === 'true',
  N8N_VERSION_NOTIFICATIONS_ENABLED:
    process.env.N8N_VERSION_NOTIFICATIONS_ENABLED === 'true',
  N8N_METRICS_ENABLED: process.env.N8N_METRICS_ENABLED === 'true',
  N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS:
    process.env.N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS === 'true',
  N8N_RUNNERS_ENABLED: process.env.N8N_RUNNERS_ENABLED === 'true',
  N8N_BLOCK_ENV_ACCESS_IN_NODE:
    process.env.N8N_BLOCK_ENV_ACCESS_IN_NODE === 'true',
  N8N_GIT_NODE_DISABLE_BARE_REPOS:
    process.env.N8N_GIT_NODE_DISABLE_BARE_REPOS === 'true',
  // n8n webhook
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL as string,
});
