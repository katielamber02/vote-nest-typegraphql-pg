import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from '../user/user.module';
import { PollOptionRepository, PollRepository } from './poll.repository';
import { PollResolver } from './poll.resolver';
import { PollService } from './poll.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollRepository, PollOptionRepository]),
    // UserModule,
  ],
  providers: [PollResolver, PollService],
})
export class PollModule {}
