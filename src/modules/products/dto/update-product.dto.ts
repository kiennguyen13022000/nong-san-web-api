import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateProductDto, ProductMediaDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ required: false, type: () => [ProductMediaDto] })
  @IsOptional()
  removeMedia?: ProductMediaDto[];
}
