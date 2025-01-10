import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async create(createUser: CreateUserDto): Promise<User> {
    const emailExists = this.userRepository.findByEmailCreate(createUser.email);
    if (emailExists) {
      throw new UnauthorizedException('Email já cadastrado');
    }
    const usernameExists = this.userRepository.findByUsernameCreate(createUser.username);
    if (usernameExists) {
      throw new UnauthorizedException('Username já cadastrado');
    }
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    return this.userRepository.create({ ...createUser, password: hashPassword });
  }

  public async login(email: string, password: string) {
    const user = this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
