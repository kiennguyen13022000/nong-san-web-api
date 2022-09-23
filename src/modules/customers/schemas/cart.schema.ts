import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { EProductModel } from "src/modules/products/enums/product-model.enum";
import { Product } from "src/modules/products/schemas/product.schema";
import { Customer } from "./customer.schema";
 

export type CartDocument = Cart & Document;

@Schema()
export class Cart {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer.name
    })
    customer: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EProductModel.PRODUCT })
    product: Product;

    @Prop()
    orderQuantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);