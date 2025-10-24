// bookings.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { JwtMiddleware } from './jwt.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UploadsService } from 'src/uploads/uploads.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey'
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, UploadsService, JwtService],
})
export class BookingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'bookings', method: RequestMethod.POST },          // POST /bookings
        { path: 'bookings/:id', method: RequestMethod.PUT },       // PUT /bookings/:id
        { path: 'bookings/seasonsprice/:id', method: RequestMethod.DELETE } // DELETE /bookings/seasonsprice/:id
      );
  }
}
