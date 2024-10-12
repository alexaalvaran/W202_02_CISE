import { CreateArticleDto } from './create-article.dto';
import { MainArticleService } from './mainArticles.service';
export declare class MainArticleController {
    private readonly mainArticleService;
    constructor(mainArticleService: MainArticleService);
    findAll(): Promise<import("./mainArticles.schema").MainArticle[]>;
    findOne(id: string): Promise<import("./mainArticles.schema").MainArticle>;
    acceptedArticle(id: string): Promise<{
        message: string;
        acceptedArticle: import("./mainArticles.schema").MainArticle;
    }>;
    updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./mainArticles.schema").MainArticle> & import("./mainArticles.schema").MainArticle & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
