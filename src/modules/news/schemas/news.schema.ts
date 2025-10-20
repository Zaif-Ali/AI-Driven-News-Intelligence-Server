import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true })
  url: string;

  @Prop({ type: [String], default: [] })
  summary: string[];

  @Prop({ default: 'neutral' })
  tone: string;

  @Prop()
  topic: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ type: Date })
  analyzedAt?: Date;

  @Prop()
  localTime?: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
