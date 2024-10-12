import { AcceptedArticleService } from './acceptedArticle.service';
import { CreateArticleDto } from './create-article.dto';
export declare class AcceptedArticleController {
    private readonly acceptArticleService;
    constructor(acceptArticleService: AcceptedArticleService);
    findAll(): Promise<import("./acceptedArticle.schema").AcceptedArticle[]>;
    findOne(id: string): Promise<import("../articles/article.schema").Article>;
    acceptedArticle(id: string): Promise<{
        message: string;
        acceptedArticle: import("./acceptedArticle.schema").AcceptedArticle;
    }>;
    updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
}
