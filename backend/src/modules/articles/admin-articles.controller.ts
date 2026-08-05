import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from "@nestjs/common";
import { AdminRole } from "@prisma/client";
import { CurrentAdmin } from "../../auth/decorators/current-admin.decorator";
import { Roles } from "../../auth/decorators/roles.decorator";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { ListArticlesDto } from "./dto/list-articles.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

const editorialRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.EDITOR];

@Controller("admin/articles")
export class AdminArticlesController {
  constructor(private readonly articles: ArticlesService) {}

  @Get() list(@Query() query: ListArticlesDto) { return this.articles.listAdmin(query); }
  @Get("meta") meta() { return this.articles.meta(); }
  @Get("slug-availability") slug(@Query("slug") slug: string, @Query("excludeId") excludeId?: string) {
    return this.articles.slugAvailability(slug ?? "", excludeId);
  }
  @Get(":id") get(@Param("id") id: string) { return this.articles.getAdmin(id); }

  @Post()
  @Roles(...editorialRoles)
  create(@Body() dto: CreateArticleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.create(dto, admin);
  }

  @Patch(":id")
  @Roles(...editorialRoles)
  update(@Param("id") id: string, @Body() dto: UpdateArticleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.update(id, dto, admin);
  }

  @Delete(":id")
  @HttpCode(200)
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)
  delete(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.softDelete(id, admin);
  }

  @Post(":id/restore")
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)
  restore(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.restore(id, admin); }

  @Post(":id/publish")
  @Roles(...editorialRoles)
  publish(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.publish(id, admin); }

  @Post(":id/unpublish")
  @Roles(...editorialRoles)
  unpublish(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.unpublish(id, admin); }

  @Post(":id/archive")
  @Roles(...editorialRoles)
  archive(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.archive(id, admin); }

  @Post(":id/duplicate")
  @Roles(...editorialRoles)
  duplicate(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.duplicate(id, admin); }
}
