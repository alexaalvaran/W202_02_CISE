import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { RejectArticle, RejectArticleDocument } from './rejectArticle.schema';

@Injectable()
export class RejectArticleService {
    constructor(
        @InjectModel(RejectArticle.name) private rejectArticleModel: Model<RejectArticleDocument>,
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    ) {}

    async findAll(): Promise<RejectArticle[]> {
        return await this.rejectArticleModel.find().exec();
    }

    async rejectArticle(id: string): Promise<RejectArticle> {
        // Step 1: Find the article in the articles collection
        const article = await this.articleModel.findById(id).exec();
        if (!article) {
            throw new HttpException(`Article with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        // Step 2: Move the article to the rejectArticles collection
        const rejectedArticle = new this.rejectArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
            rejectedDate: new Date(),
        });

        const savedRejectedArticle = await rejectedArticle.save();

        // Step 3: Delete the article from the articles collection
        await this.articleModel.findByIdAndDelete(id).exec();

        return savedRejectedArticle;
    }
}

