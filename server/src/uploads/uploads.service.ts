import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadsService {
  private uploadPath = join(process.cwd(), 'images');

  constructor(private prisma: PrismaService) {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  // Метод загрузки изображений
  async uploadPhotos(files: string[], bookingId: number) {
    const createImage = await this.prisma.images.createMany({
      data: files.map((path) => ({
        path,
        bookingId,
      })),
    });

    return createImage;
  }

  // Метод удаления одного изображения
  async deletePhoto(bookingId: number, filename: string) {
    const filePath = join(this.uploadPath, String(bookingId), filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Файл не найден');
    }

    // Удаляем файл с диска
    unlinkSync(filePath);

    // Удаляем запись из базы
    await this.prisma.images.deleteMany({
      where: {
        bookingId,
        path: filename,
      },
    });
  }
}
