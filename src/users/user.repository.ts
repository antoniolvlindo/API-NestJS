import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContextOptions } from 'vm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { randomBytes, randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
    public users: User[];
    constructor() {
        this.users = [];
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

    public create(createUser: CreateUserDto): User {
        const user = this.convertToUser(createUser);
        user.id = randomUUID();
        this.users.push(user);
        return user;
       
    }


    public findAll(): User[] {
        return this.users;
    }

    public findOne(id: String) : User{
        const user = this.users.find((user => user.id === id));
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    public update(id: string, updateUserDto: UpdateUserDto): User {
        const user = this.findOne(id);
        if (updateUserDto.username) {
          user.username = updateUserDto.username;
        }
        if (updateUserDto.firstName) {
          user.firstName = updateUserDto.firstName;
        }
        if (updateUserDto.lastName) {
          user.lastName = updateUserDto.lastName;
        }
        if (updateUserDto.email) {
          user.email = updateUserDto.email;
        }
        if (updateUserDto.active !== undefined) {
          user.active = updateUserDto.active;
        }
        return user;
    }

    public remove(id: string){
        const index = this.users.findIndex((prop) => prop.id === id);
        if (index > 0 ) throw new NotFoundException(`User with id ${id} not found`);
        this.users.splice(index, 1);
    }


}