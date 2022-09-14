import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_IMAGE } from 'src/configs/constants';
import { FilesService } from 'src/modules/files/files.service';
import { EBannerModel } from '../enums/banner-model.enum';
import { BannerImageDocument } from '../schemas/banner-image.schema';

@Injectable()
export class BannerImagesService {
  private readonly uploadDir = 'uploads';

  constructor(
    @InjectModel(EBannerModel.BANNER_IMAGE)
    private bannerImageModel: Model<BannerImageDocument>,
    private filesService: FilesService,
  ) {}

  async create(tmpImage: any) {
    if (this.isNewImage(tmpImage)) {
      const image = {
        url: await this.filesService.copy(tmpImage.url, this.uploadDir),
      };
      return (await this.bannerImageModel.create(image))._id;
    }

    return tmpImage._id;
  }

  async remove(image: any) {
    return Promise.all([
      this.bannerImageModel.findByIdAndRemove(image._id),
      image.url !== NOT_FOUND_IMAGE
        ? this.filesService.delete(image.url)
        : null,
    ]);
  }

  isNewImage(image: any) {
    return image.url.includes('tmp');
  }
}
