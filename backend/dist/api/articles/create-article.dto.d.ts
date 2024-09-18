import { Date } from 'mongoose';
export declare class CreateArticleDto {
    title: string;
    doi: string;
    author: string;
    publication_year: Date;
    sources: string;
    email: string;
}
