import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId, Types } from "mongoose";
import { CustomerSecret, CustomerSecretDocument } from "../schemas/customer-secret.schema";

@Injectable() 
export class CustomerSecretService {
    constructor(@InjectModel(CustomerSecret.name) private customerSecretModel: Model<CustomerSecretDocument>) {}

    create(customerId: Types.ObjectId, secret: string) {
        return this.customerSecretModel.findOneAndUpdate({customer: customerId}, {secret: secret}, {upsert: true}).exec();
    }

    findOne(customerId: Types.ObjectId) {
        return this.customerSecretModel.findOne({customer: customerId}).exec();
    }
}