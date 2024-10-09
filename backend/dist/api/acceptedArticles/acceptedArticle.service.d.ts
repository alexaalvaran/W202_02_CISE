import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { AcceptedArticle, AcceptedArticleDocument } from './acceptedArticle.schema';
export declare class AcceptedArticleService {
    private acceptedArticleModel;
    private articleModel;
    constructor(acceptedArticleModel: Model<AcceptedArticleDocument>, articleModel: Model<ArticleDocument>);
    findAll(): Promise<AcceptedArticle[]>;
    findOne(id: string): Promise<Article>;
    acceptArticle(id: string): Promise<AcceptedArticle>;
}
