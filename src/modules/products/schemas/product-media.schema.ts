import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EProductMediaType } from '../enums/product-media-type.enum';
import { EProductModel } from '../enums/product-model.enum';

export type ProductMediaDocument = ProductMedia & mongoose.Document;

@Schema({ timestamps: true, collection: EProductModel.PRODUCT_MEDIA })
export class ProductMedia {
  @Prop()
  url: string;

  @Prop({ type: String, enum: Object.values(EProductMediaType) })
  type: string;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
