import { ApiProperty } from '@nestjs/swagger';
import { ProductMediaType } from '../enums/product-media-type.enum';
import { ProductStatus } from '../enums/product-status.enum';

const singleMediaStructure = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: Object.values(ProductMediaType),
    },
  },
};

const galleryStructure = {
  type: 'array',
  items: singleMediaStructure,
};

const descriptionStructure = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    gallery: galleryStructure,
  },
};

const discountsStructure = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      percentOff: {
        type: 'number',
      },
      quantity: {
        type: 'number',
      },
      lastsFor: {
        type: 'number',
      },
    },
  },
};

export class CreateProductDto {
  @ApiProperty({
    required: true,
  })
  name: string;

  @ApiProperty(singleMediaStructure)
  thumbnail: any;

  @ApiProperty(galleryStructure)
  gallery: any[];

  @ApiProperty({
    required: true,
  })
  category: string;

  @ApiProperty({
    required: true,
  })
  price: number;

  @ApiProperty({
    required: true,
  })
  weight: number;

  @ApiProperty({
    required: true,
  })
  quantityInStock: number;

  @ApiProperty({
    required: true,
    enum: Object.values(ProductStatus),
  })
  status: string;

  @ApiProperty(discountsStructure)
  discounts?: any[];

  @ApiProperty(descriptionStructure)
  description: any;

  @ApiProperty()
  relatedProducts: string[];
}
