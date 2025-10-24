import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async loginAdmin(LoginAdminDto: CreateAdminDto) {
    const getAdminUser = await this.prisma.admin.findFirst({ where: { login: LoginAdminDto.username } })

    if (!getAdminUser) {
      throw new NotFoundException('Данного пользователя не существует')
    }

    console.log('getAdminUser', getAdminUser);

    const isMatch = await bcrypt.compare(LoginAdminDto.password, getAdminUser.password);

    console.log('isMatch', isMatch);

    if (!isMatch) {
      throw new InternalServerErrorException('Неверный пароль')
    }

    const token = this.jwtService.sign(
      { login: getAdminUser.login },
      {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET || 'secretKey'
      }
    )

    return token
  }

  async create(createAdmin: CreateAdminDto) {
    const getAdminUser = await this.prisma.admin.findFirst({ where: { login: createAdmin.username } })

    if (getAdminUser) {
      throw new ConflictException('Данный пользователь существует')
    }

    const saltRounds = 12;
    const hash = await bcrypt.hash(createAdmin.password, saltRounds);
    const ok = await bcrypt.compare(createAdmin.password, hash);

    if (!ok) {
      throw new InternalServerErrorException('Ошибка при создании пароля')
    }

    const createUser = await this.prisma.admin.create({
      data: {
        login: createAdmin.username,
        password: hash
      }
    });

    if (!createUser) {
      throw new InternalServerErrorException('Ошибка при создании пользователя');
    }

    return createUser
  }
}
