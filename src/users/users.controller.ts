import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDTO } from './dto/user-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto); // Certifique-se de que o serviço também esteja chamando a versão atualizada
  }

  @Get()
  async findAllPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.findAllPaginated(page, limit);
  }

  @Get('filter')
  async findAllWithFilters(@Query() query: UserQueryDTO) {
    return this.usersService.findAllWithFilters(query);
  }

  @Post('bulk')
  createBulk(@Body() createUsersDto: CreateUserDto[]) {
    return this.usersService.createBulk(createUsersDto);
  }

  @Get('search')
  async search(@Query() query: UserQueryDTO) {
    return this.usersService.search(query);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.usersService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    return this.usersService.login(email, password);
  }
}
