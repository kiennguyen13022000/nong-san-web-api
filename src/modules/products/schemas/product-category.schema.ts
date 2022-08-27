import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ProductCategory {
  @Prop()
  name: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
