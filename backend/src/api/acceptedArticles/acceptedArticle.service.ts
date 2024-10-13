import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { AcceptedArticle, AcceptedArticleDocument } from './acceptedArticle.schema';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class AcceptedArticleService {
    constructor(
        @InjectModel(AcceptedArticle.name) private acceptedArticleModel: Model<AcceptedArticleDocument>,
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    ) {}

    // Find all accepted articles
    async findAll(): Promise<AcceptedArticle[]> {
        return await this.acceptedArticleModel.find().exec();
    }

    async findOne(id:string): Promise<Article>{
        return await this.acceptedArticleModel.findById(id).exec();
    }

    // Accept an article and move it to the acceptedArticles collection
    async acceptArticle(id: string): Promise<AcceptedArticle> {
        // Step 1: Find the article in the articles collection
        const article = await this.articleModel.findById(id).exec();
        if (!article) {
            throw new HttpException(`Article with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        // Create a new entry in the acceptedArticles collection
        const acceptedArticle = new this.acceptedArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
        });

        const AcceptedArticle = await acceptedArticle.save();

        // Delete the article from the articles collection
        await this.articleModel.findByIdAndDelete(id).exec();

        return AcceptedArticle;
    }

    async update(id: string, createArticleDto:CreateArticleDto){
        return await this.acceptedArticleModel.findByIdAndUpdate(id, createArticleDto).exec();
    }

    async delete(id: string) {
        const deletedArticle = await this.acceptedArticleModel.findByIdAndDelete(id).exec();
        return deletedArticle;
    }
}