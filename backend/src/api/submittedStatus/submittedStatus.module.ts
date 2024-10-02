import { Module } from "@nestjs/common";
import { SubmittedStatusController } from "./submittedStatus.controller";
import { SubmittedStatusService } from "./submittedStatus.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from '../articles/article.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Article.name, schema:ArticleSchema}]),
    ],
    controllers: [SubmittedStatusController],
    providers: [SubmittedStatusService],
})

export class SubmittedStatusModule{}