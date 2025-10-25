import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from 'src/bookings/jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule
  ],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, JwtService],
})

export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'admin/edit', method: RequestMethod.POST },
      );
  }
}
