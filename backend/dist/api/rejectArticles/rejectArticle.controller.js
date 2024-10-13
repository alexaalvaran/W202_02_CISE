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
exports.RejectArticleController = void 0;
const common_1 = require("@nestjs/common");
const rejectArticle_service_1 = require("./rejectArticle.service");
let RejectArticleController = class RejectArticleController {
    constructor(rejectArticleService) {
        this.rejectArticleService = rejectArticleService;
    }
    async findAll() {
        try {
            return await this.rejectArticleService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to retrieve rejected articles', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async rejectArticle(id) {
        try {
            const rejectedArticle = await this.rejectArticleService.rejectArticle(id);
            return { message: 'Article rejected and moved to rejected articles', rejectedArticle };
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to reject article with ID ${id}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.RejectArticleController = RejectArticleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RejectArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RejectArticleController.prototype, "rejectArticle", null);
exports.RejectArticleController = RejectArticleController = __decorate([
    (0, common_1.Controller)('/api/rejectArticles'),
    __metadata("design:paramtypes", [rejectArticle_service_1.RejectArticleService])
], RejectArticleController);
//# sourceMappingURL=rejectArticle.controller.js.map