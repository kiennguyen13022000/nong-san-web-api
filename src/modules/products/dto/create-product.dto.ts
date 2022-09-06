import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

class ProductMediaDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @IsOptional()
  _id?: string;
}

class ProductDiscountDto {
  @ApiProperty()
  percentOff: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  lastsFor: number;
}

class ProductDescriptionDto {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: () => [ProductMediaDto] })
  gallery: ProductMediaDto[];
}

export class CreateProductDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => ProductMediaDto })
  @ValidateNested()
  thumbnail: ProductMediaDto;

  @ApiProperty({ type: () => [ProductMediaDto] })
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
    enum: Object.values(ProductStatus),
  })
  @IsNotEmpty()
  @IsEnum(Object.values(ProductStatus))
  status: ProductStatus;

  @ApiProperty({ type: () => [ProductDiscountDto] })
  discounts?: ProductDiscountDto[];

  @ApiProperty({ type: () => ProductDescriptionDto })
  description: ProductDescriptionDto;

  @ApiProperty()
  relatedProducts: string[];
}
// import { ApiProperty } from '@nestjs/swagger';
// import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { ProductMediaType } from '../enums/product-media-type.enum';
// import { ProductStatus } from '../enums/product-status.enum';

// const singleMediaStructure = {
//   type: 'object',
//   properties: {
//     url: {
//       type: 'string',
//     },
//     type: {
//       type: 'string',
//       enum: Object.values(ProductMediaType),
//     },
//   },
// };

// const galleryStructure = {
//   type: 'array',
//   items: singleMediaStructure,
// };

// const descriptionStructure = {
//   type: 'object',
//   properties: {
//     content: {
//       type: 'string',
//     },
//     gallery: galleryStructure,
//   },
// };

// const discountsStructure = {
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       percentOff: {
//         type: 'number',
//       },
//       quantity: {
//         type: 'number',
//       },
//       lastsFor: {
//         type: 'number',
//       },
//     },
//   },
// };

// export class CreateProductDto {
//   @ApiProperty({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @ApiProperty(singleMediaStructure)
//   thumbnail: any;

//   @ApiProperty(galleryStructure)
//   gallery: any[];

//   @ApiProperty({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsString()
//   category: string;

//   @ApiProperty({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsNumber()
//   price: number;

//   @ApiProperty({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsNumber()
//   weight: number;

//   @ApiProperty({
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsNumber()
//   quantityInStock: number;

//   @ApiProperty({
//     required: true,
//     enum: Object.values(ProductStatus),
//   })
//   @IsNotEmpty()
//   @IsEnum(Object.values(ProductStatus))
//   status: ProductStatus;

//   @ApiProperty(discountsStructure)
//   discounts?: any[];

//   @ApiProperty(descriptionStructure)
//   description: any;

//   @ApiProperty()
//   relatedProducts: string[];
// }
