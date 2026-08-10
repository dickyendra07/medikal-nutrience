import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Permissions } from "../../auth/decorators/permissions.decorator";
import { PERMISSIONS } from "../../auth/permissions";
import { ArticlesService } from "./articles.service";
import { CreateArticleCategoryDto, CreateTagDto, UpdateArticleCategoryDto, UpdateTagDto } from "./dto/taxonomy.dto";

@Controller("admin/article-categories")
export class ArticleCategoriesController {
  constructor(private readonly articles: ArticlesService) {}
  @Get() @Permissions(PERMISSIONS.ARTICLE_VIEW) list() { return this.articles.listCategories(); }
  @Post() @Permissions(PERMISSIONS.ARTICLE_EDIT) create(@Body() dto: CreateArticleCategoryDto) { return this.articles.createCategory(dto); }
  @Patch(":id") @Permissions(PERMISSIONS.ARTICLE_EDIT) update(@Param("id") id: string, @Body() dto: UpdateArticleCategoryDto) { return this.articles.updateCategory(id, dto); }
  @Delete(":id") @HttpCode(200) @Permissions(PERMISSIONS.ARTICLE_DELETE) delete(@Param("id") id: string) { return this.articles.deleteCategory(id); }
}

@Controller("admin/tags")
export class TagsController {
  constructor(private readonly articles: ArticlesService) {}
  @Get() @Permissions(PERMISSIONS.ARTICLE_VIEW) list() { return this.articles.listTags(); }
  @Post() @Permissions(PERMISSIONS.ARTICLE_EDIT) create(@Body() dto: CreateTagDto) { return this.articles.createTag(dto); }
  @Patch(":id") @Permissions(PERMISSIONS.ARTICLE_EDIT) update(@Param("id") id: string, @Body() dto: UpdateTagDto) { return this.articles.updateTag(id, dto); }
  @Delete(":id") @HttpCode(200) @Permissions(PERMISSIONS.ARTICLE_DELETE) delete(@Param("id") id: string) { return this.articles.deleteTag(id); }
}
