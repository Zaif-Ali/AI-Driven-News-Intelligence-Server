import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a news article entry' })
  async create(@Body() body: CreateNewsDto) {
    return this.newsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news articles' })
  async findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findAll(query);
  }
}
