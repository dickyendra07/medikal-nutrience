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
import { AdminRole } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "../../auth/decorators/roles.decorator";
import { ListMediaDto } from "./dto/list-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediaService } from "./media.service";

@Controller("admin/media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("upload")
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.EDITOR)
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException("An image file is required.");
    return this.mediaService.upload(file);
  }

  @Get()
  list(@Query() query: ListMediaDto) {
    return this.mediaService.list(query);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.mediaService.getById(id);
  }

  @Patch(":id")
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateMediaDto) {
    return this.mediaService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(200)
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.mediaService.delete(id);
  }
}
