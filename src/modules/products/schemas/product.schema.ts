import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductModel } from '../enums/product-model.enum';
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

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModel.PRODUCT_MEDIA,
  })
  thumbnail: ProductMedia;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductModel.PRODUCT_MEDIA,
      },
    ],
  })
  gallery: ProductMedia[];

  @Prop()
  price: number;

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModel.PRODUCT_CATEGORY,
  })
  category: ProductCategory;

  @Prop({ type: String, enum: Object.values(ProductStatus) })
  status: ProductStatus;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductModel.PRODUCT,
      },
    ],
  })
  relatedProducts?: Product[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
