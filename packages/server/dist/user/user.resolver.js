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
const graphql_1 = require("@nestjs/graphql");
const myContext_1 = require("../types/myContext");
const user_loginInput_1 = require("./input/user.loginInput");
const user_singupInput_1 = require("./input/user.singupInput");
const errorResponse_1 = require("./shared/errorResponse");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const yupValidationPipe_1 = require("../pipes/yupValidationPipe");
const common_1 = require("@nestjs/common");
const common_2 = require("@vote/common");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async hello() {
        return 'hello world';
    }
    async signup(signupInput) {
        return this.userService.signup(signupInput);
    }
    async login(loginInput, ctx) {
        return this.userService.login(loginInput, ctx.req);
    }
    async logout(ctx) {
        return this.userService.logout(ctx);
    }
};
__decorate([
    graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hello", null);
__decorate([
    graphql_1.Mutation(() => [errorResponse_1.ErrorResponse], { nullable: true }),
    common_1.UsePipes(new yupValidationPipe_1.YupValidationPipe(common_2.signupInputSchema)),
    __param(0, graphql_1.Args('signupInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_singupInput_1.SignupInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    graphql_1.Mutation(() => [errorResponse_1.ErrorResponse], { nullable: true }),
    __param(0, graphql_1.Args('loginInput')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_loginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    graphql_1.Resolver(user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map