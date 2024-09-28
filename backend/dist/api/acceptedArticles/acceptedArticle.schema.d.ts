import { HydratedDocument } from 'mongoose';
export type AcceptedArticleDocument = HydratedDocument<AcceptedArticle>;
export declare class AcceptedArticle {
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    email: string;
    doi: string;
    claim: string;
    evidence: string;
}
export declare const AcceptedArticleSchema: import("mongoose").Schema<AcceptedArticle, import("mongoose").Model<AcceptedArticle, any, any, any, import("mongoose").Document<unknown, any, AcceptedArticle> & AcceptedArticle & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AcceptedArticle, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AcceptedArticle>> & import("mongoose").FlatRecord<AcceptedArticle> & {
    _id: import("mongoose").Types.ObjectId;
}>;
