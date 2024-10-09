import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { error } from 'console';
import { AcceptedArticleService } from './acceptedArticle.service';

@Controller('/api/acceptArticles')
export class AcceptedArticleController {
    constructor(private readonly acceptArticleService: AcceptedArticleService) {}

    @Get('/')
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
}