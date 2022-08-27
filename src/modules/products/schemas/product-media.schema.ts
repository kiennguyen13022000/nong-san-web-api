import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductMediaType } from '../enums/product-media-type.enum';

export type ProductMediaDocument = ProductMedia & mongoose.Document;

@Schema({ timestamps: true, collection: 'product-media' })
export class ProductMedia {
  @Prop()
  url: string;

  @Prop({ type: String, enum: Object.values(ProductMediaType) })
  type: string;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
