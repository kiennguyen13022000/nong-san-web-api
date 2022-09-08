import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductMediaDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @IsOptional()
  _id?: string;
}

export class ProductDiscountDto {
  @ApiProperty()
  percentOff: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  lastsFor: number;
}

export class ProductDescriptionDto {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: () => [ProductMediaDto] })
  @IsOptional()
  @IsArray()
  gallery?: ProductMediaDto[];
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
  thumbnail: ProductMediaDto;

  @ApiProperty({ type: () => [ProductMediaDto], required: true })
  @IsArray()
  @ValidateNested()
  gallery: ProductMediaDto[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

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
  status: string;

  @ApiProperty({ type: () => [ProductDiscountDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  discounts?: ProductDiscountDto[];

  @ApiProperty({ type: () => ProductDescriptionDto, required: true })
  @ValidateNested()
  description: ProductDescriptionDto;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  relatedProducts?: string[];
}
