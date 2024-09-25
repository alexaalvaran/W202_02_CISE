import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RejectArticleController } from './rejectArticle.controller';
import { Article, RejectArticleSchema } from './rejectArticle.schema';
import { RejectArticleService } from './rejectArticle.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Article.name, schema: RejectArticleSchema}]),
    ],
    controllers: [RejectArticleController],
    providers: [RejectArticleService],
})
export class RejectArticleModule{}