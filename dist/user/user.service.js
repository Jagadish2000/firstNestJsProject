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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
let UserService = class UserService {
    constructor(strat, prisma) {
        this.strat = strat;
        this.prisma = prisma;
    }
    async borrowBook(userId, bookId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const book = await this.prisma.book.findUnique({
            where: {
                id: parseInt(bookId),
            },
        });
        book.userId = userId;
        const due = new Date();
        due.setMonth(due.getMonth() + 1);
        await this.prisma.book.update({
            where: {
                id: book.id,
            },
            data: {
                userId: userId,
                dueDate: due,
            },
        });
    }
    async returnBook(userId, bookId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const book = await this.prisma.book.findUnique({
            where: {
                id: parseInt(bookId),
            },
        });
        book.userId = userId;
        const curDate = new Date();
        await this.prisma.book.update({
            where: {
                id: book.id,
            },
            data: {
                userId: null,
            },
        });
        return curDate > book.dueDate
            ? `you were ${Math.floor(Math.abs(curDate.getTime() - book.dueDate.getTime()) /
                (1000 * 3600 * 24))} days late`
            : 'you were on time';
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async deleteUser(userId) {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                flaggedForDel: true,
            },
        });
        await this.sleep(24 * 3600 * 1000);
        if (user.flaggedForDel) {
            return await this.prisma.user.delete({
                where: {
                    id: user.id,
                },
            });
        }
    }
    async changePassword(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: dto.userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const passMatches = await argon.verify(user.hash, dto.oldPassword);
        if (!passMatches) {
            throw new common_1.ForbiddenException('invalid passowrd');
        }
        const newHash = await argon.hash(dto.newPassword);
        return await this.prisma.user.update({
            where: {
                id: dto.userId,
            },
            data: {
                hash: newHash,
            },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [jwt_1.JwtService, prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map