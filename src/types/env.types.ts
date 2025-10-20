export type envT = {
  NODE_ENV: string;
  PORT: number;
  APPLICATION_NAME: string;
  // Throttler Rate limiter config
  RATE_LIMITER_LIMIT: number;
  RATE_LIMITER_TTL: number;
  // MongoDB config
  MONGODB_URI: string;
  MONGODB_DB_NAME: string;
  MONGODB_USER: string;
  MONGODB_PASSWORD: string;
  // Timezone config
  DEFAULT_TIMEZONE: string;
  LOCAL_TIME_FORMAT: string;
  // n8n config
  N8N_BASIC_AUTH_ACTIVE: boolean;
  N8N_BASIC_AUTH_USER: string;
  N8N_BASIC_AUTH_EMAIL: string;
  N8N_BASIC_AUTH_PASSWORD: string;
  N8N_PORT: number;
  N8N_PROTOCOL: string;
  N8N_HOST: string;
  N8N_PATH: string;
  N8N_EDITOR_BASE_URL: string;
  N8N_ENCRYPTION_KEY: string;
  N8N_DIAGNOSTICS_ENABLED: boolean;
  N8N_PERSONALIZATION_ENABLED: boolean;
  N8N_VERSION_NOTIFICATIONS_ENABLED: boolean;
  N8N_METRICS_ENABLED: boolean;
  N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: boolean;
  N8N_RUNNERS_ENABLED: boolean;
  N8N_BLOCK_ENV_ACCESS_IN_NODE: boolean;
  N8N_GIT_NODE_DISABLE_BARE_REPOS: boolean;
  // n8n webhook
  N8N_WEBHOOK_URL: string;
};
