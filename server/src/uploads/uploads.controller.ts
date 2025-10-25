import { Controller, Post, Delete, Param, UploadedFiles, UseInterceptors, HttpException, HttpStatus, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly bookingsService: UploadsService) { }

  @Post(':bookingId')
  @UseInterceptors(FilesInterceptor('files', undefined, {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const bookingId = req.params.bookingId;
        const uploadPath = `../images/${bookingId}`;
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = new Date().toISOString().replace(/[:.]/g, '-');
        cb(null, `photo_${Math.floor(Math.random() * 1000)}_${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadPhotos(
    @Param('bookingId') bookingId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const filesService = files.map(file => file.filename);
    return this.bookingsService.uploadPhotos(filesService, Number(bookingId));
  }

  // Удаление одного изображения
  @Delete(':bookingId/:filename')
  async deletePhoto(
    @Param('bookingId') bookingId: string,
    @Param('filename') filename: string,
  ) {
    return this.bookingsService.deletePhoto(Number(bookingId), filename);
  }
}
