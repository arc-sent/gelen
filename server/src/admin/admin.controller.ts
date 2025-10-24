import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('login')
  async loginAdmin(
    @Res({ passthrough: true }) res: Response,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    const token = await this.adminService.loginAdmin(createAdminDto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,  // локально на http
      sameSite: 'lax', // или 'none' если POST с кросс-домена
      maxAge: 1000 * 60 * 60, // 1 час
    });


    return { message: 'Авторизация успешна' };
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
