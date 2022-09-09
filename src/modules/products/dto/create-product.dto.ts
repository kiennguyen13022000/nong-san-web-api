import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { EProductStatus } from '../enums/product-status.enum';

export class ProductMediaDto {
  @ApiProperty()
  @IsEnum(Object.values(EProductStatus))
  type: string;

  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  _id?: string;
}

export class ProductDiscountDto {
  @ApiProperty()
  @IsNumber()
  percentOff: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  lastsFor: number;
}

export class ProductDescriptionDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ type: () => [ProductMediaDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductMediaDto)
  gallery?: ProductMediaDto[];
}

export class ShockingSaleDto {
  @ApiProperty()
  @IsNumber()
  newPrice: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreateProductDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => ProductMediaDto, required: true })
  @ValidateNested()
  @Type(() => ProductMediaDto)
  thumbnail: ProductMediaDto;

  @ApiProperty({ type: () => [ProductMediaDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductMediaDto)
  gallery: ProductMediaDto[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ShockingSaleDto)
  shockingSale: ShockingSaleDto;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantityInStock: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: () => [ProductDiscountDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDiscountDto)
  discounts?: ProductDiscountDto[];

  @ApiProperty({ type: () => ProductDescriptionDto, required: true })
  @ValidateNested()
  @Type(() => ProductDescriptionDto)
  description: ProductDescriptionDto;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  relatedProducts?: string[];
}
