import { RejectArticleService } from './rejectArticle.service';
export declare class RejectArticleController {
    private readonly rejectArticleService;
    constructor(rejectArticleService: RejectArticleService);
    findAll(): Promise<import("./rejectArticle.schema").RejectArticle[]>;
    rejectArticle(id: string): Promise<{
        message: string;
        rejectedArticle: import("./rejectArticle.schema").RejectArticle;
    }>;
}
