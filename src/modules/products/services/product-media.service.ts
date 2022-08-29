import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel('product-media')
    private productMediaModel: Model<ProductMediaDocument>,
  ) {}

  async create(productId, thumbnail, media: any[]) {
    media.push(thumbnail);
    for (const m of media) {
      m.product = productId;
    }

    return this.productMediaModel.create(media);
  }
}
