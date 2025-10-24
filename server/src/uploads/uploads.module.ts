import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtMiddleware } from 'src/bookings/jwt.middleware';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey'
    }),
    PrismaModule],
  controllers: [UploadsController],
  providers: [UploadsService, PrismaService, JwtService],
})
export class UploadsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'uploads/:bookingId', method: RequestMethod.POST },       // PUT /bookings/:id
        { path: 'uploads/:bookingId/:filename', method: RequestMethod.DELETE } // DELETE /bookings/seasonsprice/:id
      );
  }
}