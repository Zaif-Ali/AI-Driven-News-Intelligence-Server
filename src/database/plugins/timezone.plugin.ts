/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import moment from 'moment-timezone';
import { Schema } from 'mongoose';

const DEFAULT_TZ = process.env.DEFAULT_TIMEZONE || 'UTC';
const LOCAL_FORMAT = process.env.LOCAL_TIME_FORMAT || 'YYYY-MM-DD HH:mm:ss z';

export function timezonePlugin(schema: Schema) {
  // Global time tracking fields
  schema.add({
    timezone: { type: String, default: 'UTC' },
    analyzedAt: { type: Date },
    localTime: { type: String },
  });

  // Ensure timestamps are enabled by default
  if (!schema.get('timestamps')) {
    schema.set('timestamps', true);
  }

  // Pre-save logic
  schema.pre('save', function (next) {
    const doc = this as any;
    const tz: string = (doc.timezone as string) || DEFAULT_TZ;
    const now = moment.tz(tz);

    doc.analyzedAt = now.toDate(); // Stored in UTC
    doc.localTime = now.format(LOCAL_FORMAT);
    next();
  });
}
