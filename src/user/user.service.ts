import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { CONFIRM_EMAIL_PREFIX } from '../constants';
import { redis } from '../redis';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { sendEmail } from '../utils/sendEmail';
import { LoginInput } from './input/user.loginInput';
import { SignupInput } from './input/user.singupInput';
import { errorMessage } from './share/errorMessage';
import { ErrorResponse } from './share/errorResponse';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExists = await this.userRepo.findOne({
      where: { email: signupInput.email },
    });
    console.log(userExists, 'userExists');

    if (userExists) {
      return errorMessage('email', 'invalid email or password');
    }

    const user = await this.userRepo.save({ ...signupInput });
    await sendEmail(signupInput.email, await confirmEmailLink(user.id));
    return null;
  }

  async confirmEmail(id: string, res: Response) {
    const userId = await redis.get(`${CONFIRM_EMAIL_PREFIX}${id}`);
    if (!userId) {
      throw new NotFoundException();
    }
    await this.userRepo.update({ id: userId }, { confirmed: true });

    res.send('ok');
  }

  async login(
    loginInput: LoginInput,
    req: Request,
  ): Promise<ErrorResponse[] | null> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email },
    });
    if (!user) {
      return errorMessage('email', 'invalid email or password');
    }
    if (user.confirmed === false) {
      return errorMessage('email', 'confirm email ');
    }
    const checkPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    if (!checkPassword) {
      return errorMessage('email', 'invalid email or password');
    }
    console.log('REQ_SESSION:', req.session);
    req.session.userId = user.id;
    return null;
  }
}
