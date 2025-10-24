import { IsBoolean, IsString, IsNumber, IsDate, IsPositive, IsArray } from "class-validator";
import { Type } from 'class-transformer';

export class CreateBookingDto {
    @IsString() title: string;
    @IsString() subTitle: string;
    @IsString() description: string;
    @IsNumber() categoryId: number;
    @IsNumber() subcategoryId: number;
    @IsNumber() guests: number;
    @IsNumber() beds: number;
    @IsNumber() area: number;
    @IsString() phone: string;
    @IsString() address: string;
    @IsString() checkIn: string;
    @IsString() exit: string;
    @IsBoolean() priority: boolean;
    @IsBoolean() childRules: boolean;
    @IsBoolean() smokingRules: boolean;
    @IsBoolean() petRules: boolean;
    @IsBoolean() partyRules: boolean;
    @IsBoolean() wifi: boolean;
    @IsBoolean() bedLinen: boolean;
    @IsBoolean() airConditioner: boolean;
    @IsBoolean() tv: boolean;
    @IsBoolean() towels: boolean;
    @IsBoolean() hairDryer: boolean;
    @IsBoolean() pool: boolean;

    @IsNumber() lat: number;
    @IsNumber() long: number;

    @Type(() => CreateSeasonalPriceDto)
    @IsArray()
    seasonalPrices: CreateSeasonalPriceDto[]
}

export class CreateSeasonalPriceDto {
    @IsNumber()
    @IsPositive()
    id?: number;

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsNumber()
    @IsPositive()
    price: number;
}