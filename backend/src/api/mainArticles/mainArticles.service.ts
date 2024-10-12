import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcceptedArticle, AcceptedArticleDocument } from '../acceptedArticles/acceptedArticle.schema';
import { CreateArticleDto } from './create-article.dto';
import { MainArticle } from './mainArticles.schema';

@Injectable()
export class MainArticleService {
    constructor(
        @InjectModel(MainArticle.name)private mainArticleModel: Model<MainArticle>,
        @InjectModel(AcceptedArticle.name)private acceptedArticleModel: Model<AcceptedArticleDocument>
    ){}

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

    // Create a new entry in the mainArticles collection
    async mainArticle(id: string): Promise<MainArticle>  {
        const article = await this.acceptedArticleModel.findById(id).exec();
        if (!article) {
            throw new HttpException(`Article with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const mainArticle = new this.mainArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
        });

        const MainArticle = await mainArticle.save();
        await this.acceptedArticleModel.findByIdAndDelete(id).exec();
        return MainArticle;
    }
}