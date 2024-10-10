import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from '../articles/article.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Article.name, schema:ArticleSchema}]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})

export class NotificationModule{}