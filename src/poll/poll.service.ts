// 1.Genearted
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PollService {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollOptionRepository, PollRepository } from './poll.repository';
import { MyContext } from './../types/myContext';
import { redis } from './../redis';
import { POLL_OPTION_ID_PREFIX } from './../constants';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollRepository)
    private readonly pollRepo: PollRepository,

    @InjectRepository(PollOptionRepository)
    private readonly pollOptionRepo: PollOptionRepository,
  ) {}
  async createPoll(
    userId: string,
    name: string,
    options: string[],
  ): Promise<boolean> {
    const poll = await this.pollRepo.insert({
      name,
      userId,
    });

    options.map(async text => {
      await this.pollOptionRepo.insert({
        text,
        votes: 0,
        pollId: poll.raw[0].id,
      });
    });

    const newPoll = await this.pollRepo.findOne({
      where: { id: poll.raw[0].id },
      relations: ['pollOption'],
    });
    console.log(newPoll);

    return true;
  }

  async vote(ctx: MyContext, pollOptionId: number): Promise<boolean> {
    const pollOption = await this.pollOptionRepo.findOne({
      where: { id: pollOptionId },
    });

    const ip =
      ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;

    if (ip) {
      const hasIp = await redis.sismember(
        `${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`,
        ip,
      );
      if (hasIp) {
        return false;
      }
    }

    await this.pollOptionRepo.update(
      { id: pollOptionId },
      { votes: pollOption.votes + 1 },
    );

    await redis.sadd(`${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip);
    return true;
  }
}
