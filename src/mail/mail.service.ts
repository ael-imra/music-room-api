import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async sendConfirmation(email: string, username: string): Promise<boolean> {
    const token = randomBytes(32).toString('hex');
    await this.userRepo.update({ email }, { token });
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
