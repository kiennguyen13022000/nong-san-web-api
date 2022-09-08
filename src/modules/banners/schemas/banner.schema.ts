import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BannerModel } from '../enums/banner-model.enum';
import { BannerImage } from './banner-image.schema';

export type BannerDocument = Banner & mongoose.Document;

@Schema({ timestamps: true })
export class Banner {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: BannerModel.BANNER_IMAGE,
  })
  image: BannerImage;

  @Prop()
  url: string;

  @Prop({ default: true })
  isShown: boolean;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
