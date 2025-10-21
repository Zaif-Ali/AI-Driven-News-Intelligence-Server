import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    example: 'https://example.com/news/article-123',
    description: 'The URL of the news or blog article to be added.',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 'Asia/Karachi',
    description:
      'The timezone associated with the news article, the default is UTC (optional).',
    required: false,
  })
  @IsString()
  @IsOptional()
  timezone: string; // e.g. 'Asia/Karachi' or 'Asia/Dubai'
}
