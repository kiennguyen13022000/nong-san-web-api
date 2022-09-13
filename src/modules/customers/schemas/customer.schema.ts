import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
 

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
    @Prop({
        default: null
    })
    fullname: string;

    @Prop()
    phone: string;

    @Prop({
        default: null
    })
    avatar: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);