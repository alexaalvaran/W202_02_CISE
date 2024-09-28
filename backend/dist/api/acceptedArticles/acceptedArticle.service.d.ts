import { Model } from 'mongoose';
import { ArticleDocument } from '../articles/article.schema';
import { AcceptedArticle, AcceptedArticleDocument } from './acceptedArticle.schema';
export declare class AcceptedArticleService {
    private acceptedArticleModel;
    private articleModel;
    constructor(acceptedArticleModel: Model<AcceptedArticleDocument>, articleModel: Model<ArticleDocument>);
    findAll(): Promise<AcceptedArticle[]>;
    acceptArticle(id: string): Promise<AcceptedArticle>;
}
