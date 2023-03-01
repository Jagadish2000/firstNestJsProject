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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const changePassword_dto_1 = require("./dto/changePassword.dto");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    getMe(user) {
        return user;
    }
    borrowBook(req) {
        console.log(req);
        const jwt = req.authorization.replace('Bearer ', '');
        const json = this.jwtService.decode(jwt, { json: true });
        const userId = json.sub;
        return this.userService.borrowBook(userId, req.bookId);
    }
    returnBook(req) {
        console.log(req);
        const jwt = req.authorization.replace('Bearer ', '');
        const json = this.jwtService.decode(jwt, { json: true });
        const userId = json.sub;
        return this.userService.returnBook(userId, req.bookId);
    }
    changePassword(req) {
        console.log(req);
        return this.userService.changePassword(req);
    }
    deleteUser(req) {
        return this.userService.deleteUser(req.userId);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'borrow a book' }),
    (0, common_1.Patch)('borrowBook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "borrowBook", null);
__decorate([
    (0, common_1.Patch)('returnBook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Patch)('changePassword'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassword_dto_1.ChangePassword]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)('deactivate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map