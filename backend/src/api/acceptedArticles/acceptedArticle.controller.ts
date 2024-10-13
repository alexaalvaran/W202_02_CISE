import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { error } from 'console';
import { AcceptedArticleService } from './acceptedArticle.service';
import { CreateArticleDto } from './create-article.dto';

@Controller('/api/acceptArticles')
export class AcceptedArticleController {
    constructor(private readonly acceptArticleService: AcceptedArticleService) {}

    @Get()
    async findAll() {
        try {
            return await this.acceptArticleService.findAll();
        } catch (error) {
            throw new HttpException('Failed to retrieve rejected articles', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get one article
    @Get('/:id')
    async findOne(@Param('id') id:string){
        try{
            return this.acceptArticleService.findOne(id);
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

    // Accept an article and move it to the acceptedArticles collection
    @Post('/:id')
    async acceptedArticle(@Param('id') id: string) {
        try {
            const acceptedArticle = await this.acceptArticleService.acceptArticle(id);
            return { message: 'Article accepted and moved to accepted articles', acceptedArticle };
        } catch (error) {
            throw new HttpException(`Failed to accept article with ID ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    //Update an article
    @Put('/:id')
    async updateArticle(
        @Param("id")id:string,
        @Body() createArticleDto:CreateArticleDto,
    ){
        try {
            await this.acceptArticleService.update(id, createArticleDto);
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

    @Delete(':/id')
    async delete(@Param('id') id:string){
        try{
            return this.acceptArticleService.delete(id);
        } catch{
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