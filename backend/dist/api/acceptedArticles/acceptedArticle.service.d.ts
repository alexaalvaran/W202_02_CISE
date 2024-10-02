import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { CreateArticleDto } from '../articles/create-article.dto';
import { AcceptedArticle, AcceptedArticleDocument } from './acceptedArticle.schema';
export declare class AcceptedArticleService {
    private acceptedArticleModel;
    private articleModel;
    constructor(acceptedArticleModel: Model<AcceptedArticleDocument>, articleModel: Model<ArticleDocument>);
    findAll(): Promise<AcceptedArticle[]>;
    findOne(id: string): Promise<AcceptedArticle>;
    update(id: string, createArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    acceptArticle(id: string): Promise<AcceptedArticle>;
}
