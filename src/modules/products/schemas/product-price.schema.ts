import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductPrice {
  @Prop()
  original: number;

  @Prop({
    default: function () {
      return this.original;
    },
  })
  current: number;
}

export const ProductPriceSchema = SchemaFactory.createForClass(ProductPrice);
