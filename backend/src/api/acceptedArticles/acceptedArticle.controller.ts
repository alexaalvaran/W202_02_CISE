import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AcceptedArticleService } from './acceptedArticle.service';

@Controller('/api/acceptArticles')
export class AcceptedArticleController {
    constructor(private readonly acceptArticleService: AcceptedArticleService) {}

    // Get all accepted articles
    @Get()
    async findAll() {
        return this.acceptArticleService.findAll();
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
