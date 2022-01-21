import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}
  async sendConfirmation(email: string, username: string): Promise<boolean> {
    const token =
      randomBytes(16).toString('hex') + new Date().getTime().toString(16);
    await this.userService.updateUser({ email }, { token });
    const mailLog = await this.mailerService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      template: 'confirmation',
      context: {
        username,
        url: `${process.env.SERVER_HOST}/auth/confirm/${token}`,
      },
    });
    return !!mailLog;
  }
}
