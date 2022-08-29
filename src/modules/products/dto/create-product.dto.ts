import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    required: true,
  })
  name: string;

  @ApiProperty({
    type: 'file',
    required: true,
  })
  thumbnail: any;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
    },
  })
  images: any[];

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
  })
  status: string;

  @ApiProperty({
    required: true,
  })
  description: string;

  @ApiProperty()
  relatedProducts: string[];
}
