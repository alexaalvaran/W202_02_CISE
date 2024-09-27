import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/article.schema'; // Assuming you have this
import { RejectArticleController } from './rejectArticle.controller';
import { RejectArticle, RejectArticleSchema } from './rejectArticle.schema';
import { RejectArticleService } from './rejectArticle.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RejectArticle.name, schema: RejectArticleSchema },
            { name: Article.name, schema: ArticleSchema },  // Assuming you're storing articles separately
        ]),
    ],
    controllers: [RejectArticleController],
    providers: [RejectArticleService],
})
export class RejectArticleModule {}
