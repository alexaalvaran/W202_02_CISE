import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>

@Schema()
export class Article {
    @Prop ({required: true})
    title: String;

    
}