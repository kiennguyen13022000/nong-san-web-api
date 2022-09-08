import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EProductModel } from '../enums/product-model.enum';
import { EProductStatus } from '../enums/product-status.enum';
import { ProductStatusDocument } from '../schemas/product-status.schema';

@Injectable()
export class ProductStatusService {
  constructor(
    @InjectModel(EProductModel.PRODUCT_STATUS)
    private productStatusModel: Model<ProductStatusDocument>,
  ) {}

  async findAll() {
    const statuses = await this.productStatusModel.find({});
    return statuses.map((status) => ({
      ...status,
      name: this.translate(status.name),
    }));
  }

  translate(status: string) {
    switch (status) {
      case EProductStatus.NEW_ARRIVAL:
        return 'Mới về';
      case EProductStatus.AVAILABLE:
        return 'Đang bán';
      case EProductStatus.ON_SHOCKING_SALE:
        return 'Sale shock';
      case EProductStatus.ON_CLEARANCE:
        return 'Thanh lý';
      case EProductStatus.OUT_OF_STOCK:
        return 'Tạm hết hàng';
      default:
        return '';
    }
  }
}
