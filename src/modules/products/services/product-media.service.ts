import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOT_FOUND_IMAGE } from 'src/configs/constants';
import { FilesService } from 'src/modules/files/services/files.service';
import { ProductMediaDto } from '../dto/create-product.dto';
import { EProductModel } from '../enums/product-model.enum';
import { ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaService {
  private uploadDir = 'uploads';
  constructor(
    @InjectModel(EProductModel.PRODUCT_MEDIA)
    private productMediaModel: Model<ProductMediaDocument>,
    private filesService: FilesService,
  ) {}

  async removeMedia(toRemove: ProductMediaDto[]) {
    return await Promise.all([
      this.productMediaModel.deleteMany({
        _id: { $in: toRemove.map((media) => media._id) },
      }),
      this.filesService.deleteMultiple(
        toRemove
          .filter((media) => media.url !== NOT_FOUND_IMAGE)
          .map((media) => media.url),
      ),
    ]);
  }

  async createIfNotExist(
    thumbnail: any,
    productGallery: any[],
    descriptionGallery: any[],
  ) {
    return await Promise.all([
      this.createSingle(thumbnail),
      this.createMultiple(productGallery),
      this.createMultiple(descriptionGallery),
    ]);
  }

  private isNewMedia(file: any) {
    return file.url.includes('tmp');
  }

  private async createSingle(file: any) {
    if (this.isNewMedia(file)) {
      const newUrl = await this.filesService.copy(file.url, this.uploadDir);
      return (
        await this.productMediaModel.create({
          ...file,
          url: newUrl,
        })
      )._id;
    }

    return file._id;
  }

  private async createMultiple(files: any[]) {
    const oldMedia = files.filter((file) => !this.isNewMedia(file));
    const newMedia = await Promise.all(
      files
        .filter((file) => this.isNewMedia(file))
        .map(async (file) => ({
          ...file,
          url: await this.filesService.copy(file.url, this.uploadDir),
        })),
    );
    const newMediaWithIds = await this.productMediaModel.create(newMedia);
    return [...oldMedia, ...newMediaWithIds].map((media) => media._id);
  }
}
