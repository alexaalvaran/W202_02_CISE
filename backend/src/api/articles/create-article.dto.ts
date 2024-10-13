import { Date } from 'mongoose';

export class CreateArticleDto {
    title:string;
    authors:string;
    source:string;
    pubyear:string;
    email: string;
    doi: string;
    claim: string;
    evidence: string;
}