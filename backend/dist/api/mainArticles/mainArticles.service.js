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
exports.MainArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const acceptedArticle_schema_1 = require("../acceptedArticles/acceptedArticle.schema");
const mainArticles_schema_1 = require("./mainArticles.schema");
let MainArticleService = class MainArticleService {
    constructor(mainArticleModel, acceptedArticleModel) {
        this.mainArticleModel = mainArticleModel;
        this.acceptedArticleModel = acceptedArticleModel;
    }
    test() {
        return 'book route testing';
    }
    async findAll() {
        return await this.mainArticleModel.find().exec();
    }
    async findOne(id) {
        return await this.mainArticleModel.findById(id).exec();
    }
    async create(createMainArticleDto) {
        return await this.mainArticleModel.create(createMainArticleDto);
    }
    async update(id, createMainArticleDto) {
        return await this.mainArticleModel.findByIdAndUpdate(id, createMainArticleDto).exec();
    }
    async delete(id) {
        const deletedMainArticle = await this.mainArticleModel.findByIdAndDelete(id).exec();
        return deletedMainArticle;
    }
    async mainArticle(id) {
        const article = await this.acceptedArticleModel.findById(id).exec();
        if (!article) {
            throw new common_1.HttpException(`Article with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const mainArticle = new this.mainArticleModel({
            title: article.title,
            authors: article.authors,
            source: article.source,
            pubyear: article.pubyear,
            email: article.email,
            doi: article.doi,
            claim: article.claim,
            evidence: article.evidence,
        });
        const MainArticle = await mainArticle.save();
        await this.acceptedArticleModel.findByIdAndDelete(id).exec();
        return MainArticle;
    }
};
exports.MainArticleService = MainArticleService;
exports.MainArticleService = MainArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mainArticles_schema_1.MainArticle.name)),
    __param(1, (0, mongoose_1.InjectModel)(acceptedArticle_schema_1.AcceptedArticle.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MainArticleService);
//# sourceMappingURL=mainArticles.service.js.map