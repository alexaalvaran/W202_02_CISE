import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { MainArticle } from './mainArticles.schema';

@Injectable()
export class MainArticleService {
    constructor(@InjectModel(MainArticle.name)private mainArticleModel: Model<MainArticle>){}

    test(): string{
        return 'book route testing';
    }

    async findAll(): Promise<MainArticle[]>{
        return await this.mainArticleModel.find().exec();
    }

    async findOne(id:string): Promise<MainArticle>{
        return await this.mainArticleModel.findById(id).exec();
    }

    async create(createMainArticleDto: CreateArticleDto){
        return await this.mainArticleModel.create(createMainArticleDto);
    }

    async update(id: string, createMainArticleDto:CreateArticleDto){
        return await this.mainArticleModel.findByIdAndUpdate(id, createMainArticleDto).exec();
    }

    async delete(id:string) {
        const deletedMainArticle = await this.mainArticleModel.findByIdAndDelete(id).exec();
        return deletedMainArticle;
    }
}