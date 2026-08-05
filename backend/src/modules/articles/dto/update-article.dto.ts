import { ArticleStatus } from "@prisma/client";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateArticleDto {
  @IsOptional() @IsString() @MinLength(3) @MaxLength(200) title?: string;
  @IsOptional() @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) @MaxLength(180) slug?: string;
  @IsOptional() @IsString() @MinLength(10) @MaxLength(500) excerpt?: string;
  @IsOptional() @IsObject() contentJson?: Record<string, unknown>;
  @IsOptional() @IsString() @MaxLength(50) coverMediaId?: string;
  @IsOptional() @IsString() @MaxLength(50) categoryId?: string;
  @IsOptional() @IsString() @MaxLength(50) authorId?: string;
  @IsOptional() @IsString() @MaxLength(70) seoTitle?: string;
  @IsOptional() @IsString() @MaxLength(180) seoDescription?: string;
  @IsOptional() @IsEnum(ArticleStatus) status?: ArticleStatus;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsISO8601() publishedAt?: string;
  @IsOptional() @IsISO8601() scheduledAt?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @MaxLength(100, { each: true }) tags?: string[];
}
