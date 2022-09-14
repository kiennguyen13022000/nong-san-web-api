import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EProductModel } from '../enums/product-model.enum';
import { ProductMedia } from './product-media.schema';

@Schema({ _id: false })
export class ProductDescription {
  @Prop()
  content: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: EProductModel.PRODUCT_MEDIA,
  })
  gallery: ProductMedia[];
}

export const ProductDescriptionSchema =
  SchemaFactory.createForClass(ProductDescription);
