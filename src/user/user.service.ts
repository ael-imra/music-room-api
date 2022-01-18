import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserDto, RegisterBodyDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  create(registerBodyDto: RegisterBodyDto) {
    const user = this.userRepo.create(registerBodyDto);
    return this.userRepo.save(user);
  }
  findUser(query: FindUserDto) {
    return this.userRepo.findOne(query);
  }
}
