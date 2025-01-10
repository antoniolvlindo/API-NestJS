import { IsOptional, IsString, IsIn } from 'class-validator';

export class UserQueryDTO {
  @IsOptional()
  @IsString()
  pageIndex?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  entity?: string;
}