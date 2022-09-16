import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId, Types } from "mongoose";
import { BaseService } from "src/modules/base/services/base.service";
import { CustomerSecret, CustomerSecretDocument } from "../schemas/customer-secret.schema";

@Injectable() 
export class CustomerSecretService extends BaseService{
    constructor(
        @InjectModel(CustomerSecret.name) private customerSecretModel: Model<CustomerSecretDocument>
    ) 
    {
        super();
        this.setModel(this.customerSecretModel)
    }
}