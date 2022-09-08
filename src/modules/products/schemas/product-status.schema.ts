import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EProductModel } from '../enums/product-model.enum';

export type ProductStatusDocument = ProductStatus & mongoose.Document;

@Schema({ collection: EProductModel.PRODUCT_STATUS })
export class ProductStatus {
  @Prop()
  name: string;
}

export const ProductStatusSchema = SchemaFactory.createForClass(ProductStatus);
