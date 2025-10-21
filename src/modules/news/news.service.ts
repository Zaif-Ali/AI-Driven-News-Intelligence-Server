import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

  async create(data: CreateNewsDto) {
    const webHookUrl = `${this.configService.get('N8N_WEBHOOK_URL')}/news-summary`;
    console.log(webHookUrl);
    try {
      this.logger.debug(`🔗 Posting to webhook URL: ${webHookUrl}`);

      const response$ = this.httpService.post(webHookUrl, { url: data.url });
      const response = await lastValueFrom(response$);

      this.logger.debug(
        `✅ Webhook responded with: ${JSON.stringify(response.data)}`,
      );

      console.log(response.data);

      const { summary, tone, topic } = response.data as {
        summary: string[];
        tone: string;
        topic: string;
      };

      const news = new this.newsModel({
        url: data.url,
        summary,
        tone,
        topic,
        timezone: data.timezone || 'UTC',
      });

      return await news.save();
    } catch (error) {
      this.logger.error('❌ Error calling n8n webhook', error);
      throw new BadRequestException('Error while calling news summary webhook');
    }
  }

  async findAll(query: QueryNewsDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      topic,
    } = query;
    const filter: Record<string, any> = {};

    if (topic) filter.topic = topic;

    const total = await this.newsModel.countDocuments(filter);
    const items = await this.newsModel
      .find(filter)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items,
    };
  }

  async findByTopic(topic: string): Promise<News[]> {
    return this.newsModel.find({ topic }).sort({ createdAt: -1 }).exec();
  }
}
