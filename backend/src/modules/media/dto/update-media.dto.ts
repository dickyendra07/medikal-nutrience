import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  altText?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  caption?: string;
}
