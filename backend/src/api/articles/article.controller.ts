import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { error } from 'console';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/test')
  test() {
    return this.articleService.test();
  }

  //Get all articles
  @Get('/')
  async findAll() {
    try {
      return this.articleService.findAll();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Articles found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  //Get one article via id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.articleService.findOne(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Create or add an article
  @Post('/')
  async addBook(@Body() createBookDto: CreateArticleDto) {
    try {
      await this.articleService.create(createBookDto);
      return { message: 'Article added successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Update an article
  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() createBookDto: CreateArticleDto,
  ) {
    try {
      await this.articleService.update(id, createBookDto);
      return { message: 'Article updated successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
