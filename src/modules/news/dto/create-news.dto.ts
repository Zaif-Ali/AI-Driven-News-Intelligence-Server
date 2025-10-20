import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateNewsDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsArray()
  @IsOptional()
  summary?: string[];

  @IsString()
  @IsOptional()
  tone?: string;

  @IsString()
  @IsOptional()
  topic?: string;

  @IsString()
  @IsOptional()
  timezone?: string; // e.g. 'Asia/Karachi' or 'Asia/Dubai'
}
