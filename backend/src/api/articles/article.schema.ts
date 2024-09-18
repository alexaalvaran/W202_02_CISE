import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: Date })
  publication_year: Date;

  @Prop({ required: true })
  sources: string;

  @Prop({ required: true })
  email: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
