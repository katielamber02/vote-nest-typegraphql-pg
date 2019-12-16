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
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../constants");
const redis_1 = require("../redis");
const poll_repository_1 = require("./poll.repository");
let PollService = class PollService {
    constructor(pollRepo, pollOptionRepo) {
        this.pollRepo = pollRepo;
        this.pollOptionRepo = pollOptionRepo;
    }
    async createPoll(userId, name, options) {
        const poll = await this.pollRepo.insert({
            name,
            userId,
        });
        options.map(async (text) => {
            await this.pollOptionRepo.insert({
                text,
                votes: 0,
                pollId: poll.raw[0].id,
            });
        });
        return true;
    }
    async vote(ctx, pollOptionId) {
        const pollOption = await this.pollOptionRepo.findOne({
            where: { id: pollOptionId },
        });
        const ip = ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;
        if (ip) {
            const hasIp = await redis_1.redis.sismember(`${constants_1.POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);
            if (hasIp) {
                return false;
            }
        }
        await this.pollOptionRepo.update({ id: pollOptionId }, { votes: pollOption.votes + 1 });
        await redis_1.redis.sadd(`${constants_1.POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);
        return true;
    }
    async poll(id) {
        return await this.pollRepo.findOne({
            where: { id },
            relations: ['pollOption'],
        });
    }
    async allPolls(take, skip) {
        return this.pollRepo
            .createQueryBuilder('poll')
            .innerJoinAndSelect('poll.pollOption', 'pollOption')
            .orderBy('poll.name', 'ASC')
            .take(take)
            .skip(skip)
            .getMany();
    }
    async deletePoll(ctx, id) {
        try {
            await this.pollRepo.delete({ id });
            const ip = ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;
            await redis_1.redis.srem(`${constants_1.POLL_OPTION_ID_PREFIX}${id}`, ip);
        }
        catch (err) {
            return false;
        }
        return true;
    }
    async myPoll(userId) {
        return await this.pollRepo.find({ where: { userId } });
    }
};
PollService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(poll_repository_1.PollRepository)),
    __param(1, typeorm_1.InjectRepository(poll_repository_1.PollOptionRepository)),
    __metadata("design:paramtypes", [poll_repository_1.PollRepository,
        poll_repository_1.PollOptionRepository])
], PollService);
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map