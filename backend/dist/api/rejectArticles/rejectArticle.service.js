"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../articles/article.schema");
const rejectArticle_schema_1 = require("./rejectArticle.schema");
let RejectArticleService = class RejectArticleService {
    constructor(rejectArticleModel, articleModel) {
        this.rejectArticleModel = rejectArticleModel;
        this.articleModel = articleModel;
    }
    async findAll() {
        return await this.rejectArticleModel.find().exec();
    }
    async rejectArticle(id) {
        const article = await this.articleModel.findById(id).exec();
        if (!article) {
            throw new common_1.HttpException(`Article with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const rejectedArticle = new this.rejectArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
            rejectedDate: new Date(),
        });
        const savedRejectedArticle = await rejectedArticle.save();
        await this.articleModel.findByIdAndDelete(id).exec();
        return savedRejectedArticle;
    }
};
exports.RejectArticleService = RejectArticleService;
exports.RejectArticleService = RejectArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rejectArticle_schema_1.RejectArticle.name)),
    __param(1, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RejectArticleService);
//# sourceMappingURL=rejectArticle.service.js.map