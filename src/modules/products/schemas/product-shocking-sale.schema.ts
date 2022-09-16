import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ProductShockingSale {
  @Prop()
  newPrice: number;

  @Prop()
  quantity: number;
}

export const ProductShockingSaleSchema =
  SchemaFactory.createForClass(ProductShockingSale);
