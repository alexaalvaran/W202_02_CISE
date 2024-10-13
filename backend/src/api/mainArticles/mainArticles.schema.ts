import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MainArticleDocument = HydratedDocument<MainArticle>;

@Schema()
export class MainArticle {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    authors: string;

    @Prop()
    source: string;

    @Prop({required:true})
    pubyear: string;

    @Prop()
    email: string;

    @Prop()
    doi: string;

    @Prop()
    claim: string;

    @Prop()
    evidence: string;
}

export const MainArticleSchema = SchemaFactory.createForClass(MainArticle);