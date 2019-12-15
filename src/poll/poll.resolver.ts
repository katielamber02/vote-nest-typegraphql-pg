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
import { Context } from '@nestjs/graphql';
import { MyContext } from './../types/myContext';
import { Query } from '@nestjs/graphql';
import { Poll } from './poll.entity';
import { AllPollsArgs } from './args/AllPollsArgs';

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

  @Mutation(() => Boolean)
  async vote(
    @Context() ctx: MyContext,
    @Args('pollOptionId') pollOptionId: number,
  ): Promise<boolean> {
    return this.pollService.vote(ctx, pollOptionId);
  }

  @Query(() => Poll)
  async poll(@Args('id') id: number): Promise<Poll> {
    return this.pollService.poll(id);
  }

  @Query(() => [Poll])
  async allPolls(@Args() { take, skip }: AllPollsArgs): Promise<Poll[]> {
    return this.pollService.allPolls(take, skip);
  }

  @Mutation(() => Boolean)
  async deletePoll(
    @Context() ctx: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return this.pollService.deletePoll(ctx, id);
  }
}
