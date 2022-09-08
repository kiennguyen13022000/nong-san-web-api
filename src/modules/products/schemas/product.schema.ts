import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EProductModel } from '../enums/product-model.enum';
import { EProductStatus } from '../enums/product-status.enum';
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
import {
  ProductShockingSale,
  ProductShockingSaleSchema,
} from './product-shocking-sale.schema';
import { ProductStatus } from './product-status.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EProductModel.PRODUCT_MEDIA,
  })
  thumbnail: ProductMedia;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: EProductModel.PRODUCT_MEDIA,
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
    ref: EProductModel.PRODUCT_CATEGORY,
  })
  category: ProductCategory;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EProductModel.PRODUCT_STATUS,
  })
  status: ProductStatus;

  @Prop({
    type: ProductShockingSaleSchema,
    required() {
      return this.status === EProductStatus.ON_SHOCKING_SALE;
    },
  })
  shockingSale: ProductShockingSale;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: EProductModel.PRODUCT,
      },
    ],
  })
  relatedProducts?: Product[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
