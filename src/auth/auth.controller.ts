import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { promisify } from 'util';
import { LoginBodyDto, RegisterBodyDto } from 'src/users/dtos/create-user.dto';
import { UserService } from 'src/users/users.service';

const scrypt = promisify(_scrypt);

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Post('register')
  async register(@Body() registerBody: RegisterBodyDto) {
    // check if email already exist
    if (await this.userService.findUser({ email: registerBody.email }))
      throw new BadRequestException('email already exist');

    // generate salt
    const salt = randomBytes(6).toString('hex');

    // hash password
    const hash = (await scrypt(registerBody.password, salt, 32)) as Buffer;

    // replace current password with the hash and add salt to hash
    registerBody.password = `${hash.toString('hex')}.${salt}`;

    // create user with body information
    const user = await this.userService.create(registerBody);

    // send confirmation mail
    this.mailService.sendConfirmation(user.email, user.username);

    return user;
  }

  @Post('login')
  async login(@Body() loginBody: LoginBodyDto) {
    // check email exist if not throw wrong email
    const user = await this.userService.findUser({ email: loginBody.email });
    if (!user) throw new BadRequestException('incorrect email');

    // check password match user hash password
    const [hash, salt] = user.password.split('.');
    const password = (await scrypt(loginBody.password, salt, 32)) as Buffer;
    if (password.toString('hex') !== hash)
      throw new BadRequestException('incorrect password');

    // check if user active his account
    if (user.token !== null)
      throw new BadRequestException('you need to active your account');

    return user;
  }

  @Get('confirm/:token')
  async activeAccount(@Param('token') token: string) {
    //set token to null if token found
    const userUpdateLog = await this.userService.updateUser(
      { token },
      { token: null },
    );

    if (!userUpdateLog.affected)
      throw new BadRequestException('token not exist');

    return 'your account activated successfully';
  }
}
