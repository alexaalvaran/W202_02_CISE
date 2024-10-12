import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { error } from 'console';
import { CreateArticleDto } from './create-article.dto';
import { MainArticleService } from './mainArticles.service';

@Controller('/api/mainArticles')
export class MainArticleController {
    constructor(private readonly mainArticleService: MainArticleService) {}

    // Get all articles
    @Get('/')
    async findAll() {
        try{
            return this.mainArticleService.findAll();
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No articles found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }

    // Get one article
    @Get('/:id')
    async findOne(@Param('id') id:string){
        try{
            return this.mainArticleService.findOne(id);
        } catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No article found',
                },
                HttpStatus.NOT_FOUND,
                {cause:error},
            );
        }
    }

    // Add an article
    @Post('/')
    async create(@Body() createMainArticleDto: CreateArticleDto){
        try{
            return this.mainArticleService.create(createMainArticleDto);
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Failed to create article',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }

    //Update an article
    @Put('/:id')
    async updateArticle(
        @Param("id")id:string,
        @Body() createArticleDto:CreateArticleDto,
    ){
        try {
            await this.mainArticleService.update(id, createArticleDto);
            return {message: 'Article updated'};
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Unable to update book',
                },
                HttpStatus.BAD_REQUEST,
                { cause: error},
            );
        }
    }

    // Delete an article
    @Delete('/:id')
    async delete(@Param('id') id: string){
        try{
            return this.mainArticleService.delete(id);
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Failed to delete article',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }
}