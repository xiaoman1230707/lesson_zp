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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    dp;
    appService;
    constructor(dp, appService) {
        this.dp = dp;
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getWelcome() {
        return this.appService.getWelcome();
    }
    login(body) {
        const { username, password } = body;
        console.log(username, password);
        if (!username || !password) {
            return {
                code: 400,
                msg: '用户名或密码不能为空'
            };
        }
        if (password.length < 6) {
            return {
                code: 400,
                msg: '密码长度不能小于6位'
            };
        }
        return this.appService.handleLogin(username, password);
    }
    async testDb() {
        try {
            const res = await this.dp.query('select * from users');
            return {
                status: '连接成功',
                data: res.rows
            };
        }
        catch (err) {
            return {
                status: '连接失败',
                error: err.message
            };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('welcome'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getWelcome", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('db-test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testDb", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('PG_CONNECTION')),
    __metadata("design:paramtypes", [Object, app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map