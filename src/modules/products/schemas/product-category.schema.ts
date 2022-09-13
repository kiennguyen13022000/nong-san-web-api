import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ProductCategoryDocument = ProductCategory & mongoose.Document;

@Schema({ timestamps: true })
export class ProductCategory {
  @Prop()
  name: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
