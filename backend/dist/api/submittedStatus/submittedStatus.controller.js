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
exports.SubmittedStatusController = void 0;
const common_1 = require("@nestjs/common");
const submittedStatus_service_1 = require("./submittedStatus.service");
let SubmittedStatusController = class SubmittedStatusController {
    constructor(submittedStatusService) {
        this.submittedStatusService = submittedStatusService;
    }
    async sendEmail({ email }) {
        try {
            const foundEmail = await this.submittedStatusService.findEmail(email);
            if (!foundEmail) {
                throw new common_1.HttpException('Email not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.submittedStatusService.sendEmail(foundEmail.email);
            return { status: 200, message: 'Email sent successfully' };
        }
        catch (error) {
            console.error('Error:', error);
            throw new common_1.HttpException('Failed to send email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SubmittedStatusController = SubmittedStatusController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubmittedStatusController.prototype, "sendEmail", null);
exports.SubmittedStatusController = SubmittedStatusController = __decorate([
    (0, common_1.Controller)('/api/submittedStatus'),
    __metadata("design:paramtypes", [submittedStatus_service_1.SubmittedStatusService])
], SubmittedStatusController);
//# sourceMappingURL=submittedStatus.controller.js.map