import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post
} from '@nestjs/common';
import { error } from 'console';
import { RejectArticleDto } from './create-reject-Article.dto';
import { RejectArticleService } from './rejectArticle.service';

@Controller('/api/rejectArticles')
export class RejectArticleController {
    constructor(private readonly rejectArticleService: RejectArticleService) {}
    
    @Get('test')
    test(){
        return this.rejectArticleService.test();
    }

    // Get all rejected articles
    @Get('/')
    async findAll() {
        try{
            return this.rejectArticleService.findAll();
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

    // Get one rejected article
    @Get('/:id')
    async findOne(@Param('id') id:string){
        try{
            return this.rejectArticleService.findOne(id);
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

    // Add a rejected article
    @Post('/')
    async create(@Body() rejectArticleDto: RejectArticleDto){
        try{
            await this.rejectArticleService.create(rejectArticleDto);
            return this.rejectArticleService.create(rejectArticleDto);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Article could not be created',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }

    // Delete a rejected article
    @Delete('/:id')
    async delete(@Param('id') id:string){
        try{
            return this.rejectArticleService.delete(id);
        } catch {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Article could not be deleted',
                },
                HttpStatus.BAD_REQUEST,
                {cause:error},
            );
        }
    }
}