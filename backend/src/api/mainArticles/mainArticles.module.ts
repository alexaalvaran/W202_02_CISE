import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcceptedArticle, AcceptedArticleSchema } from '../acceptedArticles/acceptedArticle.schema';
import { MainArticleController } from './mainArticles.controller';
import { MainArticle, MainArticleSchema } from './mainArticles.schema';
import { MainArticleService } from './mainArticles.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MainArticle.name, schema: MainArticleSchema },
            { name: AcceptedArticle.name, schema: AcceptedArticleSchema }
        ]),
    ],
    controllers: [MainArticleController],
    providers: [MainArticleService],
})
export class MainArticleModule {}
