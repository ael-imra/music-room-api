import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, MailModule],
  controllers: [AuthController],
})
export class AuthModule {}
