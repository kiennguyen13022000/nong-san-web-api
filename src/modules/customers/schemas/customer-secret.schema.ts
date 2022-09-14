import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { CUSTOMER_TABLE_NAME } from "src/configs/constants";

export type CustomerSecretDocument = CustomerSecret & Document;

@Schema({ collection: 'customer_secrets'})
export class CustomerSecret{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: CUSTOMER_TABLE_NAME})
    customer: CustomerSecret

    @Prop()
    secret: string;
}

export const CustomerSecretSchema = SchemaFactory.createForClass(CustomerSecret);