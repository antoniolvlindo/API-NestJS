import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '835247',
  database: 'nestJS',
  entities: [User],
  migrations: ['./src/migration/**/*.ts'],
  synchronize: false,
});