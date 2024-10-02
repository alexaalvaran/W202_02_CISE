import { AcceptedArticleService } from './acceptedArticle.service';
export declare class AcceptedArticleController {
    private readonly acceptArticleService;
    constructor(acceptArticleService: AcceptedArticleService);
    findAll(): Promise<import("./acceptedArticle.schema").AcceptedArticle[]>;
    acceptedArticle(id: string): Promise<{
        message: string;
        acceptedArticle: import("./acceptedArticle.schema").AcceptedArticle;
    }>;
}
