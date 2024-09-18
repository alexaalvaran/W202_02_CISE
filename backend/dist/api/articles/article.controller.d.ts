import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    test(): string;
    findAll(): Promise<import("./article.schema").Article[]>;
    findOne(id: string): Promise<import("./article.schema").Article>;
    addBook(createBookDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    updateBook(id: string, createBookDto: CreateArticleDto): Promise<{
        message: string;
    }>;
}
