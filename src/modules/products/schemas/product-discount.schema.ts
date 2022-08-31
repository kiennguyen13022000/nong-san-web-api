import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductDiscount {
  @Prop()
  percentOff: number;

  @Prop()
  quantity: number;

  @Prop()
  lastsFor: number; // in hours
}

export const ProductDiscountSchema =
  SchemaFactory.createForClass(ProductDiscount);
