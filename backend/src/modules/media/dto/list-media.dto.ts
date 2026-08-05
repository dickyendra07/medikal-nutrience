import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { ALLOWED_MEDIA_MIME_TYPES } from "../media.constants";

export class ListMediaDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @IsOptional()
  @IsIn(ALLOWED_MEDIA_MIME_TYPES)
  mimeType?: (typeof ALLOWED_MEDIA_MIME_TYPES)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 24;
}
