import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from "@nestjs/common";
import { CurrentAdmin } from "../../auth/decorators/current-admin.decorator";
import { Permissions } from "../../auth/decorators/permissions.decorator";
import { PERMISSIONS } from "../../auth/permissions";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { ListArticlesDto } from "./dto/list-articles.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Controller("admin/articles")
export class AdminArticlesController {
  constructor(private readonly articles: ArticlesService) {}

  @Get() @Permissions(PERMISSIONS.ARTICLE_VIEW) list(@Query() query: ListArticlesDto) { return this.articles.listAdmin(query); }
  @Get("meta") @Permissions(PERMISSIONS.ARTICLE_VIEW) meta() { return this.articles.meta(); }
  @Permissions(PERMISSIONS.ARTICLE_VIEW)
  @Get("slug-availability") slug(@Query("slug") slug: string, @Query("excludeId") excludeId?: string) {
    return this.articles.slugAvailability(slug ?? "", excludeId);
  }
  @Get(":id") @Permissions(PERMISSIONS.ARTICLE_VIEW) get(@Param("id") id: string) { return this.articles.getAdmin(id); }

  @Post()
  @Permissions(PERMISSIONS.ARTICLE_CREATE)
  create(@Body() dto: CreateArticleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.create(dto, admin);
  }

  @Patch(":id")
  @Permissions(PERMISSIONS.ARTICLE_EDIT)
  update(@Param("id") id: string, @Body() dto: UpdateArticleDto, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.update(id, dto, admin);
  }

  @Delete(":id")
  @HttpCode(200)
  @Permissions(PERMISSIONS.ARTICLE_DELETE)
  delete(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.softDelete(id, admin);
  }

  @Post(":id/restore")
  @Permissions(PERMISSIONS.ARTICLE_DELETE)
  restore(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.restore(id, admin); }

  @Post(":id/publish")
  @Permissions(PERMISSIONS.ARTICLE_PUBLISH)
  publish(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.publish(id, admin); }

  @Post(":id/unpublish")
  @Permissions(PERMISSIONS.ARTICLE_PUBLISH)
  unpublish(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.unpublish(id, admin); }

  @Post(":id/archive")
  @Permissions(PERMISSIONS.ARTICLE_EDIT)
  archive(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.archive(id, admin); }

  @Post(":id/duplicate")
  @Permissions(PERMISSIONS.ARTICLE_CREATE)
  duplicate(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) { return this.articles.duplicate(id, admin); }

  @Post(":id/submit-review")
  @Permissions(PERMISSIONS.ARTICLE_SUBMIT_REVIEW)
  submitReview(@Param("id") id: string, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.submitReview(id, admin);
  }

  @Post(":id/approve-review")
  @Permissions(PERMISSIONS.ARTICLE_MEDICAL_REVIEW)
  approveReview(@Param("id") id: string, @Body("notes") notes: string | undefined, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.approveReview(id, notes, admin);
  }

  @Post(":id/request-changes")
  @Permissions(PERMISSIONS.ARTICLE_MEDICAL_REVIEW)
  requestChanges(@Param("id") id: string, @Body("notes") notes: string | undefined, @CurrentAdmin() admin: CurrentAdminUser) {
    return this.articles.requestChanges(id, notes, admin);
  }
}
