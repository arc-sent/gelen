import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async auth(cookies: string) {
    try {
      const user = this.jwtService.verify(cookies, { secret: process.env.JWT_SECRET });

      const checkUser = await this.prisma.admin.findFirst({
        where: {
          login: user.login
        }
      });

      if (!checkUser) {
        throw new NotFoundException('Данного админа не существует')
      }

      return true

    } catch (e) {
      console.error(e);

      throw new UnauthorizedException('Invalid token');
    }

  }
}
