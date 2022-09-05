import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // name?: string;

  // @ApiProperty(singleMediaStructure)
  // @IsOptional()
  // thumbnail?: any;

  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // category?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // price?: number;

  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // weight?: number;

  // @ApiProperty()
  // @IsOptional()
  // @IsNotEmpty()
  // @IsNumber()
  // quantityInStock?: number;

  // @ApiProperty({
  //   enum: Object.values(ProductStatus),
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsEnum(Object.values(ProductStatus))
  // status?: ProductStatus;

  // @ApiProperty(discountsStructure)
  // discounts?: any[];

  // @ApiProperty()
  // @IsOptional()
  // relatedProducts?: string[];

  // @ApiProperty({
  //   type: 'object',
  //   required: false,
  //   properties: {
  //     add: galleryStructure,
  //     remove: {
  //       type: 'array',
  //       items: {
  //         type: 'string',
  //       },
  //     },
  //   },
  // })
  // gallery?: any;

  // @ApiProperty({
  //   type: 'object',
  //   required: false,
  //   properties: {
  //     content: {
  //       type: 'string',
  //     },
  //     gallery: {
  //       type: 'object',
  //       properties: {
  //         add: galleryStructure,
  //         remove: {
  //           type: 'array',
  //           items: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // description?: any;
  @ApiProperty({ required: false })
  @IsOptional()
  removeMedia?: string[];
}
