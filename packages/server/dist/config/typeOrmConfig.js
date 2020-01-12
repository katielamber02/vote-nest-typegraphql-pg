"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'begginYou6342',
    database: 'voitingapp',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
};
//# sourceMappingURL=typeOrmConfig.js.map