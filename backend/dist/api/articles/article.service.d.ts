import { Article } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<Article>);
    test(): string;
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(CreateArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, CreateArticleDto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
