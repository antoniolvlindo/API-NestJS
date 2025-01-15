import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserQueryDTO } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  public async findAllPaginated(
    page: number = 1,
    limit: number = 10,
  ) {
    return this.userRepository.findAllWithPagination(page, limit);
  }
  
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

  public async createBulk(createUsersDto: CreateUserDto[]): Promise<User[]> {
    const createdUsers: User[] = [];
    for (const userDto of createUsersDto) {
      const user = await this.create(userDto);
      createdUsers.push(user);
    }
    return createdUsers;
  }

  findAll({ page, limit }: { page: number; limit: number }) {
    const [result, total] = this.userRepository.findAllPaginated(page, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
      total,
      page,
      totalPages,
    };
  }

  public async findAllWithFilters(query: UserQueryDTO) {
    return this.userRepository.findAllWithFilters(query);
  }

  public async findOne (id:string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(id, updateUser);
  }


 public async remove(id: string): Promise<void> {
    return await this.userRepository.remove(id);
 }

  public async search(query: UserQueryDTO): Promise<User[]> {
    const result = await this.userRepository.findAllWithFilters(query);
    return result.data;
  }

}
