import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateCmsUserDto {
  @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @IsEmail() @MaxLength(254) email!: string;
  @IsString() @MinLength(12) @MaxLength(128) password!: string;
  @IsString() @MaxLength(50) roleId!: string;
}

export class UpdateCmsUserDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  @IsOptional() @IsString() @MinLength(12) @MaxLength(128) password?: string;
  @IsOptional() @IsString() @MaxLength(50) roleId?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateCmsRoleDto {
  @IsString() @MinLength(2) @MaxLength(100) name!: string;
  @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) @MaxLength(80) slug!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsArray() @ArrayMaxSize(100) @IsString({ each: true }) permissionIds!: string[];
}

export class UpdateCmsRoleDto {
  @IsOptional() @IsString() @MinLength(2) @MaxLength(100) name?: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(100) @IsString({ each: true }) permissionIds?: string[];
}
