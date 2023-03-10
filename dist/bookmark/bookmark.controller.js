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
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const bookmark_service_1 = require("./bookmark.service");
const jwt_1 = require("@nestjs/jwt");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService, jwtService) {
        this.bookmarkService = bookmarkService;
        this.jwtService = jwtService;
    }
    addBookmark(req) {
        console.log(req);
        const jwt = req.rawHeaders[1].replace('Bearer ', '');
        const json = this.jwtService.decode(jwt, { json: true });
        const userId = json.sub;
        return this.bookmarkService.addBookmark(userId, req.body.bookId, req.body.pagenum);
    }
};
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "addBookmark", null);
BookmarkController = __decorate([
    (0, common_1.Controller)('bookmark'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService,
        jwt_1.JwtService])
], BookmarkController);
exports.BookmarkController = BookmarkController;
//# sourceMappingURL=bookmark.controller.js.map