import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  public async create(createUser: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    return this.userRepository.create({...createUser, password: hashPassword} );
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string): User {
    return this.userRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
   return this.userRepository.remove(id);
  }
}
