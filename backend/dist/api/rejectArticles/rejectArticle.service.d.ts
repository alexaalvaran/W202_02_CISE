import { Model } from 'mongoose';
import { ArticleDocument } from '../articles/article.schema';
import { RejectArticle, RejectArticleDocument } from './rejectArticle.schema';
export declare class RejectArticleService {
    private rejectArticleModel;
    private articleModel;
    constructor(rejectArticleModel: Model<RejectArticleDocument>, articleModel: Model<ArticleDocument>);
    findAll(): Promise<RejectArticle[]>;
    rejectArticle(id: string): Promise<RejectArticle>;
}
