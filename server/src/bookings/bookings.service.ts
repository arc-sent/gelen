import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private upload: UploadsService
  ) { }

  async create(createBookingDto: CreateBookingDto, long: number, lat: number) {
    const createBooking = await this.prisma.booking.create({
      data: {
        title: createBookingDto.title,
        subTitle: createBookingDto.subTitle,
        description: createBookingDto.description,
        categoryId: createBookingDto.categoryId,
        subcategoryId: createBookingDto.subcategoryId,
        guests: createBookingDto.guests,
        beds: createBookingDto.beds,
        area: createBookingDto.area,
        address: createBookingDto.address,
        phone: createBookingDto.phone,
        checkIn: createBookingDto.checkIn,
        exit: createBookingDto.exit,
        priority: createBookingDto.priority,
        childRules: createBookingDto.childRules,
        smokingRules: createBookingDto.smokingRules,
        petRules: createBookingDto.petRules,
        partyRules: createBookingDto.partyRules,
        wifi: createBookingDto.wifi,
        bedLinen: createBookingDto.bedLinen,
        airConditioner: createBookingDto.airConditioner,
        tv: createBookingDto.tv,
        towels: createBookingDto.towels,
        hairDryer: createBookingDto.hairDryer,
        pool: createBookingDto.pool,
        lat: lat,
        long: long,
        seasonalPrices: {
          createMany: {
            data: createBookingDto.seasonalPrices.map((item) => ({
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
              price: item.price,
            })),
          },
        }
      },
    });

    if (!createBooking) {
      throw new InternalServerErrorException('Ошибка при создании предложения')
    }

    return {
      booking: createBooking,
    };
  }

  async update(id: number, updateBookingDto: CreateBookingDto) {
    // Проверяем, существует ли бронирование
    const existingBooking = await this.prisma.booking.findUnique({ where: { id } });
    if (!existingBooking) {
      throw new NotFoundException(`Бронирование с id ${id} не найдено`);
    }


    // Обновляем бронирование
    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        title: updateBookingDto.title,
        subTitle: updateBookingDto.subTitle,
        description: updateBookingDto.description,
        categoryId: updateBookingDto.categoryId,
        subcategoryId: updateBookingDto.subcategoryId,
        guests: updateBookingDto.guests,
        beds: updateBookingDto.beds,
        area: updateBookingDto.area,
        address: updateBookingDto.address,
        phone: updateBookingDto.phone,
        checkIn: updateBookingDto.checkIn,
        exit: updateBookingDto.exit,
        priority: updateBookingDto.priority,
        childRules: updateBookingDto.childRules,
        smokingRules: updateBookingDto.smokingRules,
        petRules: updateBookingDto.petRules,
        partyRules: updateBookingDto.partyRules,
        wifi: updateBookingDto.wifi,
        bedLinen: updateBookingDto.bedLinen,
        airConditioner: updateBookingDto.airConditioner,
        tv: updateBookingDto.tv,
        towels: updateBookingDto.towels,
        hairDryer: updateBookingDto.hairDryer,
        pool: updateBookingDto.pool,
        lat: updateBookingDto.lat,
        long: updateBookingDto.long,
        seasonalPrices: {
          createMany: {
            data: updateBookingDto.seasonalPrices
              .map(item => {
                if (item.id) return undefined; // пропускаем уже существующие
                return {
                  startDate: new Date(item.startDate),
                  endDate: new Date(item.endDate),
                  price: item.price,
                };
              })
              .filter((item): item is { startDate: Date; endDate: Date; price: number } => !!item),
          },
        },
      },
      include: {
        seasonalPrices: true,
        image: true,
        category: true,
        subcategory: true,
      },
    });

    if (!updatedBooking) {
      throw new InternalServerErrorException('Ошибка при обновлении бронирования');
    }

    return updatedBooking;
  }

  async findAll(targetDate: Date) {
    const findBookings = await this.prisma.booking.findMany({
      orderBy: {
        priority: 'desc',
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
        subTitle: true,
        guests: true,
        beds: true,
        area: true,
        address: true,
        seasonalPrices: {
          where: {
            startDate: { lte: targetDate },
            endDate: { gte: targetDate }
          },
          select: {
            price: true
          }
        },
        image: {
          take: 1
        }
      }
    });

    if (!findBookings) {
      throw new NotFoundException('Предложений не существует.')
    }

    return findBookings
  }

  async SSR() {
    const findBookings = await this.prisma.booking.findMany({
      include: {
        image: true,
        seasonalPrices: true,
        category: true,
        subcategory: true
      }
    }
    );

    if (!findBookings) {
      throw new NotFoundException('Предложений не существует.')
    }

    return findBookings
  }

  async findOne(id: number) {
    const findBooking = await this.prisma.booking.findFirst({
      where: { id: id },
      include: {
        image: true,
        seasonalPrices: true,
        category: true,
        subcategory: true
      }
    });

    if (!findBooking) {
      throw new NotFoundException('Данного предложения не существует.')
    }

    return findBooking;
  }

  async findPriority(targetDate: Date) {
    const findBooking = await this.prisma.booking.findMany(
      {
        where: { priority: true },
        select: {
          id: true,
          title: true,
          categoryId: true,
          subTitle: true,
          guests: true,
          beds: true,
          area: true,
          address: true,
          seasonalPrices: {
            where: {
              startDate: { lte: targetDate },
              endDate: { gte: targetDate }
            },
            select: {
              price: true
            }
          },
          image: {
            take: 1
          }
        }
      }
    );

    if (!findBooking) {
      throw new NotFoundException('Данных предложения не существует.')
    }

    return findBooking
  }

  async findRandom() {
    const randomBookings = await this.prisma.$queryRaw`
  SELECT * FROM "Booking"
  ORDER BY RANDOM()
  LIMIT 3
`;

    if (!randomBookings) {
      throw new NotFoundException('Данного предложения не существует.')
    }

    return randomBookings
  }

  remove(id: number) {
    return this.prisma.booking.delete({ where: { id: id } });
  }

  async deleteSeasonalPrices(id: number) {
    return this.prisma.seasonalPrice.delete({ where: { id: id } })
  }
}
