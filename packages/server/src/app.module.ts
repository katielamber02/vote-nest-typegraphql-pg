import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { pollOptionLoader } from './loaders/pollOptionLoader';
import { PollModule } from './poll/poll.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({
        req,
        res,
        pollOptionLoader: pollOptionLoader(),
      }),
    }),
    UserModule,
    PollModule,
  ],
})
export class AppModule {}
