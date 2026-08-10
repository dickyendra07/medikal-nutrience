import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Permissions } from "../../auth/decorators/permissions.decorator";
import { PERMISSIONS } from "../../auth/permissions";
import { ListMediaDto } from "./dto/list-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediaService } from "./media.service";

@Controller("admin/media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("upload")
  @Permissions(PERMISSIONS.MEDIA_UPLOAD)
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException("An image file is required.");
    return this.mediaService.upload(file);
  }

  @Get()
  @Permissions(PERMISSIONS.MEDIA_VIEW)
  list(@Query() query: ListMediaDto) {
    return this.mediaService.list(query);
  }

  @Get(":id")
  @Permissions(PERMISSIONS.MEDIA_VIEW)
  getById(@Param("id") id: string) {
    return this.mediaService.getById(id);
  }

  @Patch(":id")
  @Permissions(PERMISSIONS.MEDIA_EDIT)
  update(@Param("id") id: string, @Body() dto: UpdateMediaDto) {
    return this.mediaService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(200)
  @Permissions(PERMISSIONS.MEDIA_DELETE)
  delete(@Param("id") id: string) {
    return this.mediaService.delete(id);
  }
}
