import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from './product.schema';

export type ProductMediaDocument = ProductMedia & mongoose.Document;

@Schema({ collection: 'productMedia' })
export class ProductMedia {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'product' })
  product: Product;

  @Prop()
  url: string;

  @Prop({ type: String, enum: ['image', 'video'] })
  type: string;

  @Prop()
  isThumbnail: boolean;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
