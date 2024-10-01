import { HydratedDocument } from 'mongoose';
export type RejectArticleDocument = HydratedDocument<RejectArticle>;
export declare class RejectArticle {
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    email: string;
    doi: string;
    claim: string;
    evidence: string;
    rejectedDate: Date;
}
export declare const RejectArticleSchema: import("mongoose").Schema<RejectArticle, import("mongoose").Model<RejectArticle, any, any, any, import("mongoose").Document<unknown, any, RejectArticle> & RejectArticle & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RejectArticle, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RejectArticle>> & import("mongoose").FlatRecord<RejectArticle> & {
    _id: import("mongoose").Types.ObjectId;
}>;
