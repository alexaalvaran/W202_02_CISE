import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainArticleController } from './mainArticles.controller';
import { MainArticle, MainArticleSchema } from './mainArticles.schema';
import { MainArticleService } from './mainArticles.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: MainArticle.name, schema: MainArticleSchema}]),
    ],
    controllers: [MainArticleController],
    providers: [MainArticleService],
})
export class MainArticleModule{}