import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from "./rejectArticle.schema";

@Injectable()
export class RejectArticleService {
    constructor(@InjectModel(Article.name)private rejectArticleModel: Model<Article>){}

    test(): string{
        return 'book route testing';
    }

    async findAll(): Promise<Article[]>{
        return await this.rejectArticleModel.find().exec();
    }

    async findOne(id:string): Promise<Article>{
        return await this.rejectArticleModel.findById(id).exec();
    }

    async create(createArticleDto: Article){
        return await this.rejectArticleModel.create(createArticleDto);
    }

    async delete(id:string) {
        const deletedArticle = await this.rejectArticleModel.findByIdAndDelete(id).exec();
        return deletedArticle;
    }

}