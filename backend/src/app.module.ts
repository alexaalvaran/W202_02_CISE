import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AcceptArticleModule } from './api/acceptedArticles/acceptedArticle.module';
import { ArticleModule } from './api/articles/article.module';
import { RejectArticleModule } from './api/rejectArticles/rejectArticle.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DB_URI),
  ArticleModule,
  RejectArticleModule,
  AcceptArticleModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
