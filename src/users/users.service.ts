import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserDto, RegisterBodyDto } from './dtos/create-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}
  create(registerBodyDto: RegisterBodyDto) {
    const user = this.userRepo.create(registerBodyDto);
    return this.userRepo.save(user);
  }
  findUser(query: FindUserDto) {
    return this.userRepo.findOne(query);
  }
  updateUser(query: FindUserDto, updateBody) {
    return this.userRepo.update(query, updateBody);
  }
}
