import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { BannerModel } from '../enums/banner-model.enum';
import { BannerImageDocument } from '../schemas/banner-image.schema';

@Injectable()
export class BannerImagesService {
  private readonly uploadDir = 'uploads';
  constructor(
    @InjectModel(BannerModel.BANNER_IMAGE)
    private bannerImageModel: Model<BannerImageDocument>,
    private filesService: FilesService,
  ) {}

  async create(tmpImage: any) {
    const image = {
      url: await this.filesService.copy(tmpImage.url, this.uploadDir),
    };
    return (await this.bannerImageModel.create(image))._id;
  }

  async remove(image: any) {
    return await Promise.all([
      this.bannerImageModel.findByIdAndRemove(image._id),
      this.filesService.delete(image.url),
    ]);
  }
}
