import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { promisify } from 'util';
import { LoginBodyDto, RegisterBodyDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Controller('auth')
export class UserController {
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
    const hash = (await scrypt(registerBody.password, salt, 32)).toString();

    // replace current password with the hash and add salt to hash
    registerBody.password = `${hash}.${salt}`;

    // create user with body information
    const user = await this.userService.create(registerBody);

    // send confirmation mail
    await this.mailService.sendConfirmation(user.email, user.username);

    return user;
  }

  @Post('login')
  async login(@Body() loginBody: LoginBodyDto) {
    // check email exist if not throw wrong email
    const user = await this.userService.findUser({ email: loginBody.email });
    if (!user) throw new BadRequestException('incorrect email');

    // check password match user hash password
    const [hash, salt] = user.password.split('.');
    const password = (await scrypt(loginBody.password, salt, 32)).toString();
    if (password !== hash) throw new BadRequestException('incorrect password');

    return user;
  }
}
