import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { AdminRole } from "@prisma/client";
import { Roles } from "../../auth/decorators/roles.decorator";
import { ArticlesService } from "./articles.service";
import { CreateArticleCategoryDto, CreateTagDto, UpdateArticleCategoryDto, UpdateTagDto } from "./dto/taxonomy.dto";

const taxonomyRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN];

@Controller("admin/article-categories")
export class ArticleCategoriesController {
  constructor(private readonly articles: ArticlesService) {}
  @Get() list() { return this.articles.listCategories(); }
  @Post() @Roles(...taxonomyRoles) create(@Body() dto: CreateArticleCategoryDto) { return this.articles.createCategory(dto); }
  @Patch(":id") @Roles(...taxonomyRoles) update(@Param("id") id: string, @Body() dto: UpdateArticleCategoryDto) { return this.articles.updateCategory(id, dto); }
  @Delete(":id") @HttpCode(200) @Roles(...taxonomyRoles) delete(@Param("id") id: string) { return this.articles.deleteCategory(id); }
}

@Controller("admin/tags")
export class TagsController {
  constructor(private readonly articles: ArticlesService) {}
  @Get() list() { return this.articles.listTags(); }
  @Post() @Roles(...taxonomyRoles) create(@Body() dto: CreateTagDto) { return this.articles.createTag(dto); }
  @Patch(":id") @Roles(...taxonomyRoles) update(@Param("id") id: string, @Body() dto: UpdateTagDto) { return this.articles.updateTag(id, dto); }
  @Delete(":id") @HttpCode(200) @Roles(...taxonomyRoles) delete(@Param("id") id: string) { return this.articles.deleteTag(id); }
}
