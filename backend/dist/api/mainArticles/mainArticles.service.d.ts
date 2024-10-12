import { Model } from 'mongoose';
import { AcceptedArticleDocument } from '../acceptedArticles/acceptedArticle.schema';
import { CreateArticleDto } from './create-article.dto';
import { MainArticle } from './mainArticles.schema';
export declare class MainArticleService {
    private mainArticleModel;
    private acceptedArticleModel;
    constructor(mainArticleModel: Model<MainArticle>, acceptedArticleModel: Model<AcceptedArticleDocument>);
    test(): string;
    findAll(): Promise<MainArticle[]>;
    findOne(id: string): Promise<MainArticle>;
    create(createMainArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, MainArticle> & MainArticle & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, createMainArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, MainArticle> & MainArticle & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, MainArticle> & MainArticle & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    mainArticle(id: string): Promise<MainArticle>;
}
