import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './api/articles/article.module';
import { RejectArticleModule } from './api/rejectArticles/rejectArticle.module';
import { UserModule } from './api/users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DB_URI),
  ArticleModule,
  UserModule,
  RejectArticleModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
