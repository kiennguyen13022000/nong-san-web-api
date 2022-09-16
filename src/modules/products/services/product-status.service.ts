import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EProductModel } from '../enums/product-model.enum';
import { ProductStatusDocument } from '../schemas/product-status.schema';

@Injectable()
export class ProductStatusService {
  constructor(
    @InjectModel(EProductModel.PRODUCT_STATUS)
    private productStatusModel: Model<ProductStatusDocument>,
  ) {}

  async findAll() {
    return this.productStatusModel.find({}).lean();
  }
}
