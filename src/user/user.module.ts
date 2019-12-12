import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver],
})
export class UserModule {}

// WITHOUT REPOSITORY:
// import { Module } from '@nestjs/common';
// import { UserResolver } from './user.resolver';

// @Module({
//     providers: [UserResolver],
// })
// export class UserModule {}
