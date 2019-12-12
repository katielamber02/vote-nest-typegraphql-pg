import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signupInput';
import { UserService } from './user.service';
import { ErrorResponse } from './share/errorResponse';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }
  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }
}
