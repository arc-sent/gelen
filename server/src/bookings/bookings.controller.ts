import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Put } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { DateTime } from 'luxon';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto, createBookingDto.long, createBookingDto.lat);
  }

  @Get('priority')
  findPriority() {
    const nowGelendzhik = DateTime.now().setZone('Europe/Moscow').toJSDate();
    return this.bookingsService.findPriority(nowGelendzhik);
  }

  @Get('random')
  findRandom() {
    return this.bookingsService.findRandom();
  }

  @Get('ssr')
  SSR() {
    return this.bookingsService.SSR();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Get()
  findAll() {
    const nowGelendzhik = DateTime.now().setZone('Europe/Moscow').toJSDate();;
    return this.bookingsService.findAll(nowGelendzhik);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: CreateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  @Delete('seasonsprice/:id')
  deleteSeasonalPrices(@Param('id') id: string) {
    return this.bookingsService.deleteSeasonalPrices(+id);
  }
}
