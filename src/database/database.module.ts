import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      entities: [Users],
      synchronize: process.env.MODE !== process.env.MODE_PRODUCTION,
    }),
  ],
})
export class DatabaseModule {}
