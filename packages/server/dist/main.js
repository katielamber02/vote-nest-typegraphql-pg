"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const Store = require("connect-redis");
const dotenv = require("dotenv");
const session = require("express-session");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
const redis_1 = require("./redis");
dotenv.config();
async function bootstrap() {
    const RedisStore = Store(session);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        store: new RedisStore({
            client: redis_1.redis,
        }),
        name: 'vote',
        secret: constants_1.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 365,
        },
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map