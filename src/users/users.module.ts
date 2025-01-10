import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'seu-segredo',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
