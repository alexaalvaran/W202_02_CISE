import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { RejectArticleController } from './rejectArticle.controller';
import { RejectArticle, RejectArticleSchema } from './rejectArticle.schema';
import { RejectArticleService } from './rejectArticle.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RejectArticle.name, schema: RejectArticleSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    controllers: [RejectArticleController],
    providers: [RejectArticleService],
})
export class RejectArticleModule {}