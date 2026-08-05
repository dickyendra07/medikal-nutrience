import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.MediaAssetCreateInput) {
    return this.prisma.mediaAsset.create({ data });
  }

  findById(id: string) {
    return this.prisma.mediaAsset.findFirst({ where: { id, deletedAt: null } });
  }

  async list(where: Prisma.MediaAssetWhereInput, skip: number, take: number) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.mediaAsset.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.mediaAsset.count({ where }),
    ]);

    return { items, total };
  }

  update(id: string, data: Prisma.MediaAssetUpdateInput) {
    return this.prisma.mediaAsset.update({ where: { id }, data });
  }

  softDelete(id: string) {
    return this.prisma.mediaAsset.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
