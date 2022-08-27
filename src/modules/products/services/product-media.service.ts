import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel('product-media')
    private productMediaModel: Model<ProductMediaDocument>,
    private filesService: FilesService,
  ) {}

  async create(
    tmpThumbnail: any,
    tmpProductGallery: any[],
    tmpDescriptionGallery: any[],
  ) {
    const uploadDir = 'uploads';

    const thumbnail = {
      ...tmpThumbnail,
      url: this.filesService.copy(tmpThumbnail.url, uploadDir),
    };
    const productGallery = tmpProductGallery.map((tmp) => ({
      ...tmp,
      url: this.filesService.copy(tmp.url, uploadDir),
    }));
    const descriptionGallery = tmpDescriptionGallery.map((tmp) => ({
      ...tmp,
      url: this.filesService.copy(tmp.url, uploadDir),
    }));

    const result = await Promise.all([
      this.productMediaModel.create(thumbnail),
      this.productMediaModel.create(productGallery),
      this.productMediaModel.create(descriptionGallery),
    ]);

    return {
      thumbnail: result[0]._id,
      productGallery: result[1].map((doc) => doc._id),
      descriptionGallery: result[2].map((doc) => doc._id),
    };
  }
}
