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
exports.AcceptedArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../articles/article.schema");
const acceptedArticle_schema_1 = require("./acceptedArticle.schema");
let AcceptedArticleService = class AcceptedArticleService {
    constructor(acceptedArticleModel, articleModel) {
        this.acceptedArticleModel = acceptedArticleModel;
        this.articleModel = articleModel;
    }
    async findAll() {
        return await this.acceptedArticleModel.find().exec();
    }
    async findOne(id) {
        return await this.acceptedArticleModel.findById(id).exec();
    }
    async acceptArticle(id) {
        const article = await this.articleModel.findById(id).exec();
        if (!article) {
            throw new common_1.HttpException(`Article with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const acceptedArticle = new this.acceptedArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
        });
        const AcceptedArticle = await acceptedArticle.save();
        await this.articleModel.findByIdAndDelete(id).exec();
        return AcceptedArticle;
    }
    async update(id, createArticleDto) {
        return await this.acceptedArticleModel.findByIdAndUpdate(id, createArticleDto).exec();
    }
    async delete(id) {
        const deletedArticle = await this.acceptedArticleModel.findByIdAndDelete(id).exec();
        return deletedArticle;
    }
};
exports.AcceptedArticleService = AcceptedArticleService;
exports.AcceptedArticleService = AcceptedArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(acceptedArticle_schema_1.AcceptedArticle.name)),
    __param(1, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AcceptedArticleService);
//# sourceMappingURL=acceptedArticle.service.js.map