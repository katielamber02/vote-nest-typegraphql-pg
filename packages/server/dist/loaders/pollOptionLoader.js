"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dataloader = require("dataloader");
const typeorm_1 = require("typeorm");
const poll_entity_1 = require("../poll/poll.entity");
exports.pollOptionLoader = () => new Dataloader(async (keys) => {
    const poll = await typeorm_1.getRepository(poll_entity_1.Poll)
        .createQueryBuilder('poll')
        .leftJoinAndSelect('poll.pollOption', 'pollOption')
        .where('poll.id IN (:...keys)', { keys })
        .getMany();
    return poll.map(poll => poll.pollOption);
});
//# sourceMappingURL=pollOptionLoader.js.map