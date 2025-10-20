import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() body: CreateNewsDto) {
    return this.newsService.create(body);
  }

  @Get()
  async findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findAll(query);
  }
}
