import { Module } from "@nestjs/common";
import { AdminArticlesController } from "./admin-articles.controller";
import { ArticleCategoriesController, TagsController } from "./article-taxonomy.controller";
import { ArticlesRepository } from "./articles.repository";
import { ArticlesService } from "./articles.service";
import { PublicArticlesController } from "./public-articles.controller";

@Module({
  controllers: [AdminArticlesController, ArticleCategoriesController, TagsController, PublicArticlesController],
  providers: [ArticlesRepository, ArticlesService],
})
export class ArticlesModule {}
