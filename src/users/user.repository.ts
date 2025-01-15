import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContextOptions } from 'vm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { randomBytes, randomUUID } from 'crypto';
import { UserQueryDTO } from './dto/user-query.dto';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
      private readonly repo: Repository<User>,
    ) {}

    private users: User[] = [];
  
    public findByEmail(email: string): User {
      const user = this.users.find(user => user.email === email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    }

    public findByEmailCreate(email: string): User | undefined {
      return this.users.find(user => user.email === email);
    }

    public findByUsernameCreate(username: string): User | undefined {
      return this.users.find(user => user.username === username);
    }

    public findByUsername(username: string): User {
      const user = this.users.find(user => user.username === username);
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return user;
    }

    public async findAllWithFilters(
      filters: UserQueryDTO,
    ): Promise<{
      data: User[];
      total: number;
      page: number;
      limit: number;
    }> {
      const { pageIndex, pageSize, sortBy, sortOrder, searchTerm } = filters;
  
      const currentPage = parseInt(pageIndex, 10) > 0 ? parseInt(pageIndex, 10) : 1;
      const recordsPerPage = parseInt(pageSize, 10) > 0 ? parseInt(pageSize, 10) : 10;
      const skip = (currentPage - 1) * recordsPerPage;
  
      // Cria o query builder
      const queryBuilder = this.repo.createQueryBuilder('user');
  
      // Exemplo: Filtra apenas usuários ativos
      queryBuilder.where('user.active = :active', { active: true });
  
      // Filtro de busca
      if (searchTerm) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('user.username ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
              .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
              .orWhere('user.firstName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
              .orWhere('user.lastName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
          }),
        );
      }
  
      // Conta total de usuários
      const totalRecords = await queryBuilder.getCount();
  
      // Ordenação, paginação e retorno
      const users = await queryBuilder
        .orderBy(`user.${sortBy || 'createdAt'}`, sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC')
        .skip(skip)
        .take(recordsPerPage)
        .getMany();
  
      return {
        data: users,
        total: totalRecords,
        page: currentPage,
        limit: recordsPerPage,
      };
    }

    private convertToUser(createUser: CreateUserDto): User {
        const user = new User();
        user.username = createUser.username;
        user.password = createUser.password;
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.email = createUser.email;
        user.active = true;
        return user;
    }

    public async create(createUser: CreateUserDto): Promise<User> {
      const user = this.repo.create(createUser);
      return await this.repo.save(user);
    }

    public findAllPaginated(page: number, limit: number): [User[], number] {
      const start = (page - 1) * limit;
      const end = start + limit;
      const result = this.users.slice(start, end);
      return [result, this.users.length];
    }

    public async findAllWithPagination(
      page: number = 1,
      limit: number = 10,
    ): Promise<{
      data: User[];
      totalPages: number;
      currentPage: number;
      totalItems: number;
    }> {
      const skip = (page - 1) * limit;
    
      // Obtém o total de registros
      const totalItems = await this.repo.count();
    
      // Calcula o total de páginas
      const totalPages = Math.ceil(totalItems / limit);
    
      // Busca os dados com paginação
      const data = await this.repo.find({
        skip,
        take: limit,
      });
    
      return {
        data,
        totalPages,
        currentPage: page,
        totalItems,
      };
    }


    public findAll(): User[] {
        return this.users;
    }

    public async findOne(id: string): Promise<User> {
      const user = await this.repo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    }

    public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.repo.findOne({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        return await this.repo.save(user);
    }

    public async remove(id: string): Promise<void> {
      const result = await this.repo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    }

    public async searchUsers(query: UserQueryDTO): Promise<{
      data: User[];
      total: number;
      page: number;
      limit: number;
    }> {
      const {searchTerm, sortBy, sortOrder, pageIndex, pageSize} = query;
      const currentPage = parseInt(pageIndex, 10) > 0 ? parseInt(pageIndex, 10) : 1;
      const recordsPerPage = parseInt(pageSize, 10) > 0 ? parseInt(pageSize, 10) : 10;
      const skip = (currentPage - 1) * recordsPerPage;
      
      const queryBuilder = this.repo.createQueryBuilder('user');

      if(searchTerm){
        queryBuilder.andWhere(
          new Brackets ((qb) => {
          qb.where('user.username ILIKE :searchTerm', {searchTerm: `%${searchTerm}%`}) 
          .orWhere('user.email ILIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
          .orWhere('user.firstName ILIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
          .orWhere('user.lastName ILIKE :searchTerm', {searchTerm: `%${searchTerm}%`})
          }),
        );
      }
      const totalRecords = await queryBuilder.getCount();
      const users = await queryBuilder
      .orderBy(`user.${sortBy || 'createdAt'}`, sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC')
      .skip(skip)
      .take(recordsPerPage)
      .getMany();
      
      return{
        data: users,
        total: totalRecords,
        page: currentPage,
        limit: recordsPerPage,
      }
    }

}