import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryNewsDto {
  @ApiProperty({
    example: 'technology',
    description: 'Topic to filter news articles (optional).',
    required: false,
  })
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiProperty({
    example: 1,
    description: 'Page number for pagination (optional, default is 1).',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description:
      'Number of items per page for pagination (optional, default is 10).',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    example: 'createdAt',
    description:
      'Field to sort the news articles by (optional, default is createdAt).',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiProperty({
    example: 'desc',
    description:
      'Order of sorting: "asc" for ascending or "desc" for descending (optional, default is desc).',
    required: false,
  })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'desc';
}
