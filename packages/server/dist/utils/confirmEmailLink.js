"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
const redis_1 = require("../redis");
exports.confirmEmailLink = async (userId) => {
    const id = uuid_1.v4();
    await redis_1.redis.set(`${constants_1.CONFIRM_EMAIL_PREFIX}${id}`, userId, 'ex', 60 * 60 * 15);
    return `${process.env.BACKEND_HOST}/user/confirm/${id}`;
};
//# sourceMappingURL=confirmEmailLink.js.map