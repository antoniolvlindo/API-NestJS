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

    public update(id: string, UpdateUserDto: UpdateUserDto){
        const user = this.findOne(id);
        if (UpdateUserDto.username) {
            user.username = UpdateUserDto.username;
        }
        if (UpdateUserDto.firstName) {
            user.firstName = UpdateUserDto.firstName;
        }
        if (UpdateUserDto.lastName) {
            user.lastName = UpdateUserDto.lastName;
        }
        if (UpdateUserDto.email) {
            user.email = UpdateUserDto.email;
        }
        if (UpdateUserDto.active !== undefined) {
            user.active = UpdateUserDto.active;
        }
        return user;
    }

    public remove(id: string){
        const index = this.users.findIndex((prop) => prop.id === id);
        if (index > 0 ) throw new NotFoundException(`User with id ${id} not found`);
        this.users.splice(index, 1);
    }


}