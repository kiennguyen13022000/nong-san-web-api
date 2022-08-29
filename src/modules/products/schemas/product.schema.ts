import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductCategory } from './product-category.schema';
import { ProductMedia } from './product-media.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantityInStock: number;

  @Prop()
  quantitySold: number;

  @Prop()
  weight: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product-category' })
  category: ProductCategory;

  @Prop({ type: String, enum: Object.values(ProductStatus) })
  status: ProductStatus;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }])
  relatedProducts: Product[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
