import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type BannerImageDocument = BannerImage & mongoose.Document;

@Schema()
export class BannerImage {
  @Prop()
  url: string;
}

export const BannerImageSchema = SchemaFactory.createForClass(BannerImage);
