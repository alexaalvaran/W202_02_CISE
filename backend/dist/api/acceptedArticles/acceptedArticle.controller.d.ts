import { CreateArticleDto } from '../articles/create-article.dto';
import { AcceptedArticleService } from './acceptedArticle.service';
export declare class AcceptedArticleController {
    private readonly acceptArticleService;
    constructor(acceptArticleService: AcceptedArticleService);
    findAll(): Promise<import("./acceptedArticle.schema").AcceptedArticle[]>;
    findOne(id: string): Promise<import("./acceptedArticle.schema").AcceptedArticle>;
    updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    acceptedArticle(id: string): Promise<{
        message: string;
        acceptedArticle: import("./acceptedArticle.schema").AcceptedArticle;
    }>;
}
