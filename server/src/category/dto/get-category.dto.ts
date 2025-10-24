import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, ValidateNested, IsArray } from 'class-validator';

export class SubcategoryDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    subName: string;

    @IsBoolean()
    selected: boolean;
}

export class CategoryDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    subName: string;

    @IsBoolean()
    selected: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubcategoryDto)
    subcategories: SubcategoryDto[];
}


export class BookingFilterDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    categories: CategoryDto[];
    @IsInt()
    priceMin: number;
    @IsInt()
    priceMax: number;
}
