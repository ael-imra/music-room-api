import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: process.env.MODE !== process.env.MODE_PRODUCTION,
    }),
  ],
})
export class DatabaseModule {}
