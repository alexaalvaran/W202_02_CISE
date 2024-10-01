import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { RejectArticleService } from './rejectArticle.service';

@Controller('/api/rejectArticles')
export class RejectArticleController {
    constructor(private readonly rejectArticleService: RejectArticleService) {}

    // Get all rejected articles
    @Get()
    async findAll() {
        try {
            return await this.rejectArticleService.findAll();
        } catch (error) {
            throw new HttpException('Failed to retrieve rejected articles', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Reject an article and move it to rejectArticles
    @Post('/:id')
    async rejectArticle(@Param('id') id: string) {
        try {
            const rejectedArticle = await this.rejectArticleService.rejectArticle(id);
            return { message: 'Article rejected and moved to rejected articles', rejectedArticle };
        } catch (error) {
            throw new HttpException(`Failed to reject article with ID ${id}`, HttpStatus.BAD_REQUEST);
        }
    }
}