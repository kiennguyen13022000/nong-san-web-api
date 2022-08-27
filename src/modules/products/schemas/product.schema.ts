import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductCategory } from './product-category.schema';
import {
  ProductDescription,
  ProductDescriptionSchema,
} from './product-description.schema';
import {
  ProductDiscount,
  ProductDiscountSchema,
} from './product-discount.schema';
import { ProductMedia } from './product-media.schema';
import { ProductPrice, ProductPriceSchema } from './product-price.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product-media' })
  thumbnail: ProductMedia;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'product-media' })
  gallery: ProductMedia[];

  @Prop({ type: ProductPriceSchema })
  price: ProductPrice;

  @Prop()
  quantityInStock: number;

  @Prop({ default: 0 })
  quantitySold: number;

  @Prop()
  weight: number;

  @Prop({ type: [ProductDiscountSchema] })
  discounts?: ProductDiscount[];

  @Prop({ type: ProductDescriptionSchema })
  description: ProductDescription;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product-category' })
  category: ProductCategory;

  @Prop({ type: String, enum: Object.values(ProductStatus) })
  status: ProductStatus;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'product' })
  relatedProducts?: Product[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);