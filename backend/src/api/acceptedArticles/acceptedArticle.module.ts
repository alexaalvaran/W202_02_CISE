import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema';
import { AcceptedArticleController } from './acceptedArticle.controller';
import { AcceptedArticle, AcceptedArticleSchema } from './acceptedArticle.schema';
import { AcceptedArticleService } from './acceptedArticle.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: AcceptedArticle.name, schema: AcceptedArticleSchema },
            { name: Article.name, schema: ArticleSchema },  // To handle moving articles to acceptedArticles
        ]),
    ],
    controllers: [AcceptedArticleController],
    providers: [AcceptedArticleService],
})
export class AcceptArticleModule {}