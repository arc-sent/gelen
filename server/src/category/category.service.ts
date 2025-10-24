import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/get-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.prisma.bookingCategory.findMany({
      include: {
        subCategories: true,
      },
    });
  }

  async findMany(
    body: CategoryDto[],
    priceMin: number,
    priceMax: number,
    targetDate: Date
  ) {
    const seasonalPriceFilter = {
      price: { gte: priceMin, lte: priceMax },
      startDate: { lte: targetDate },
      endDate: { gte: targetDate },
    };

    // Получаем все выбранные категории и подкатегории
    const selectedCategoryIds = body
      .filter(item => item.selected)
      .map(item => item.id);

    const selectedSubcategoryIds = body.flatMap(item =>
      item.subcategories.filter(sub => sub.selected).map(sub => sub.id)
    );

    // Если ничего не выбрано, возвращаем все записи по цене и дате
    if (selectedCategoryIds.length === 0 && selectedSubcategoryIds.length === 0) {
      return await this.prisma.booking.findMany({
        where: {
          seasonalPrices: { some: seasonalPriceFilter },
        },
        include: {
          category: true,
          subcategory: true,
          image: true,
          seasonalPrices: true,
        },
      });
    }

    // Если есть выбранные категории или подкатегории
    const bookings = await this.prisma.booking.findMany({
      where: {
        seasonalPrices: { some: seasonalPriceFilter },
        OR: [
          { categoryId: { in: selectedCategoryIds } },
          { subcategoryId: { in: selectedSubcategoryIds } },
        ],
      },
      include: {
        category: true,
        subcategory: true,
        image: true,
        seasonalPrices: true,
      },
    });

    return bookings;
  }



  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

