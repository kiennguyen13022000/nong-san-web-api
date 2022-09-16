import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { EProductMediaType } from '../enums/product-media-type.enum';

export class ProductMediaDto {
  @ApiProperty({ enum: Object.values(EProductMediaType) })
  @IsEnum(Object.values(EProductMediaType))
  type: string;

  @ApiProperty()
  // @IsUrl()
  @IsString()
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
  thumbnail: ProductMediaDto;

  @ApiProperty({ type: () => [ProductMediaDto], required: true })
  @IsArray()
  @ValidateNested({ each: true })
  gallery: ProductMediaDto[];

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  // @ValidateIf((product) => product.status === '6319b0665e81d55881adc2df')
  @IsOptional()
  @ValidateNested()
  shockingSale?: ShockingSaleDto;

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
  discounts?: ProductDiscountDto[];

  @ApiProperty({ type: () => ProductDescriptionDto, required: true })
  @ValidateNested()
  description: ProductDescriptionDto;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  relatedProducts?: string[];
}
