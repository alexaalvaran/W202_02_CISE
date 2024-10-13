import { HydratedDocument } from "mongoose";
export type MainArticleDocument = HydratedDocument<MainArticle>;
export declare class MainArticle {
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    email: string;
    doi: string;
    claim: string;
    evidence: string;
}
export declare const MainArticleSchema: import("mongoose").Schema<MainArticle, import("mongoose").Model<MainArticle, any, any, any, import("mongoose").Document<unknown, any, MainArticle> & MainArticle & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MainArticle, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MainArticle>> & import("mongoose").FlatRecord<MainArticle> & {
    _id: import("mongoose").Types.ObjectId;
}>;
