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
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const allPollsArgs_1 = require("./args/allPollsArgs");
const createPollArgs_args_1 = require("./args/createPollArgs.args");
const auth_guard_1 = require("./auth.guard");
const getUserId_decorator_1 = require("./getUserId.decorator");
const poll_entity_1 = require("./poll.entity");
const poll_service_1 = require("./poll.service");
let PollResolver = class PollResolver {
    constructor(pollService) {
        this.pollService = pollService;
    }
    async createPoll(userId, { name, options }) {
        return this.pollService.createPoll(userId, name, options);
    }
    async vote(ctx, pollOptionId) {
        return this.pollService.vote(ctx, pollOptionId);
    }
    async poll(id) {
        return this.pollService.poll(id);
    }
    async allPolls({ take, skip }) {
        return this.pollService.allPolls(take, skip);
    }
    async deletePoll(ctx, id) {
        return this.pollService.deletePoll(ctx, id);
    }
    async myPoll(userId) {
        return this.pollService.myPoll(userId);
    }
    async pollOption(poll, ctx) {
        return await ctx.pollOptionLoader.load(poll.id);
    }
};
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, getUserId_decorator_1.GetUserId()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createPollArgs_args_1.CreatePollArgs]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "createPoll", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('pollOptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "vote", null);
__decorate([
    graphql_1.Query(() => poll_entity_1.Poll),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "poll", null);
__decorate([
    graphql_1.Query(() => [poll_entity_1.Poll]),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [allPollsArgs_1.AllPollsArgs]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "allPolls", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "deletePoll", null);
__decorate([
    graphql_1.Query(() => [poll_entity_1.Poll]),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, getUserId_decorator_1.GetUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "myPoll", null);
__decorate([
    graphql_1.ResolveProperty('pollOption'),
    __param(0, graphql_1.Root()),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [poll_entity_1.Poll, Object]),
    __metadata("design:returntype", Promise)
], PollResolver.prototype, "pollOption", null);
PollResolver = __decorate([
    graphql_1.Resolver(() => poll_entity_1.Poll),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], PollResolver);
exports.PollResolver = PollResolver;
//# sourceMappingURL=poll.resolver.js.map