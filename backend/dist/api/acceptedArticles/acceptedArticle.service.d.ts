import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';
import { AcceptedArticle, AcceptedArticleDocument } from './acceptedArticle.schema';
import { CreateArticleDto } from './create-article.dto';
export declare class AcceptedArticleService {
    private acceptedArticleModel;
    private articleModel;
    constructor(acceptedArticleModel: Model<AcceptedArticleDocument>, articleModel: Model<ArticleDocument>);
    findAll(): Promise<AcceptedArticle[]>;
    findOne(id: string): Promise<Article>;
    acceptArticle(id: string): Promise<AcceptedArticle>;
    update(id: string, createArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AcceptedArticle> & AcceptedArticle & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, AcceptedArticle> & AcceptedArticle & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, AcceptedArticle> & AcceptedArticle & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, AcceptedArticle> & AcceptedArticle & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
