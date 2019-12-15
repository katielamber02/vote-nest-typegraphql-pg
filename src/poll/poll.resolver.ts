// 1. Generated
// import { Resolver } from '@nestjs/graphql';
// @Resolver('Poll')
// export class PollResolver {}

// import { UseGuards } from '@nestjs/common';
// import { Mutation, Resolver } from '@nestjs/graphql';
// import { AuthGuard } from './auth.guard';

// 2.
// @Resolver('Poll')
// export class PollResolver {
//   @Mutation(() => Boolean)
//   @UseGuards(AuthGuard)
//   async createPoll() {
//     return true;
//   }
// }

// 3.
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePollArgs } from './args/createPollArgs.args';
import { AuthGuard } from './auth.guard';
import { GetUserId } from './getUserId.decorator';
import { PollService } from './poll.service';

@Resolver('Poll')
export class PollResolver {
  constructor(private readonly pollService: PollService) {}
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll(
    @GetUserId() userId: string,
    @Args() { name, options }: CreatePollArgs,
  ): Promise<boolean> {
    return this.pollService.createPoll(userId, name, options);
  }
}
