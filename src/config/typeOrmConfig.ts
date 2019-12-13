import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'begginYou6342',
//   database: 'voitingapp',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
//   synchronize: true,

//   logging: true,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'begginYou6342',
  database: 'votingapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  dropSchema: true,
  subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
};
