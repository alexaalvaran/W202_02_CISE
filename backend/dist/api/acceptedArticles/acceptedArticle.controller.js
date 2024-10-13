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
exports.AcceptedArticleController = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
const acceptedArticle_service_1 = require("./acceptedArticle.service");
const create_article_dto_1 = require("./create-article.dto");
let AcceptedArticleController = class AcceptedArticleController {
    constructor(acceptArticleService) {
        this.acceptArticleService = acceptArticleService;
    }
    async findAll() {
        try {
            return await this.acceptArticleService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve rejected articles', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return this.acceptArticleService.findOne(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No article found',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async acceptedArticle(id) {
        try {
            const acceptedArticle = await this.acceptArticleService.acceptArticle(id);
            return { message: 'Article accepted and moved to accepted articles', acceptedArticle };
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to accept article with ID ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateArticle(id, createArticleDto) {
        try {
            await this.acceptArticleService.update(id, createArticleDto);
            return { message: 'Article updated' };
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to update book',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async delete(id) {
        try {
            return this.acceptArticleService.delete(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Failed to delete article',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
};
exports.AcceptedArticleController = AcceptedArticleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcceptedArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcceptedArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcceptedArticleController.prototype, "acceptedArticle", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], AcceptedArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)(':/id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcceptedArticleController.prototype, "delete", null);
exports.AcceptedArticleController = AcceptedArticleController = __decorate([
    (0, common_1.Controller)('/api/acceptArticles'),
    __metadata("design:paramtypes", [acceptedArticle_service_1.AcceptedArticleService])
], AcceptedArticleController);
//# sourceMappingURL=acceptedArticle.controller.js.map