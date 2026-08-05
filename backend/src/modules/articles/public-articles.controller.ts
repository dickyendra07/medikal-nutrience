import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "../../auth/decorators/public.decorator";
import { ArticlesService } from "./articles.service";
import { PublicArticlesQueryDto } from "./dto/list-articles.dto";

@Public()
@Controller("public/articles")
export class PublicArticlesController {
  constructor(private readonly articles: ArticlesService) {}
  @Get() list(@Query() query: PublicArticlesQueryDto) { return this.articles.listPublic(query); }
  @Get(":slug") get(@Param("slug") slug: string) { return this.articles.getPublic(slug); }
}
