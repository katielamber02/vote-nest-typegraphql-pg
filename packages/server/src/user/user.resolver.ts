import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from 'src/types/myContext';
import { LoginInput } from './input/user.loginInput';
import { SignupInput } from './input/user.singupInput';
import { ErrorResponse } from './shared/errorResponse';
import { User } from './user.entity';
import { UserService } from './user.service';
// import * as yup from 'yup';
import { YupValidationPipe } from '../pipes/yupValidationPipe';
import { UsePipes } from '@nestjs/common';
import { signupInputSchema } from '@vote/common';

// 20. moved to common/schemas/user.ts
// const schema = yup.object().shape({
//   userName: yup
//     .string()
//     .min(3)
//     .max(30)
//     .required(),
//   email: yup
//     .string()
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .min(3, 'password must be atleast 3 charachters long')
//     .max(150)
//     .required(),
// });

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  @UsePipes(new YupValidationPipe(signupInputSchema))
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: MyContext) {
    return this.userService.logout(ctx);
  }
}
