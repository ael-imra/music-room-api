import { Module } from '@nestjs/common';
import { authService } from './auth.service';
import { userService } from './user.service';

@Module({
  providers: [userService, authService],
})
export class userModule {}
