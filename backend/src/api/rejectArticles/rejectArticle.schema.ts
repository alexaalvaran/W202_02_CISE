import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RejectArticleDocument = HydratedDocument<RejectArticle>;

@Schema()
export class RejectArticle {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    authors: string;

    @Prop()
    source: string;

    @Prop({ required: true })
    pubyear: string;  // Keeping pubyear as a string

    @Prop()
    email: string;

    @Prop()
    doi: string;

    @Prop()
    claim: string;

    @Prop()
    evidence: string;

    @Prop({ default: new Date() })
    rejectedDate: Date;  // When the article was rejected
}

export const RejectArticleSchema = SchemaFactory.createForClass(RejectArticle);