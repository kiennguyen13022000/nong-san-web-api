import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { ProductMediaDto } from '../dto/create-product.dto';
import { ProductModel } from '../enums/product-model.enum';
import { ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaService {
  private uploadDir = 'uploads';
  constructor(
    @InjectModel(ProductModel.PRODUCT_MEDIA)
    private productMediaModel: Model<ProductMediaDocument>,
    private filesService: FilesService,
  ) {}

  async create(
    tmpThumbnail: any,
    tmpProductGallery: any[],
    tmpDescriptionGallery: any[],
  ) {
    const thumbnail = {
      ...tmpThumbnail,
      url: this.filesService.copy(tmpThumbnail.url, this.uploadDir),
    };
    const productGallery = tmpProductGallery.map((tmp) => ({
      ...tmp,
      url: this.filesService.copy(tmp.url, this.uploadDir),
    }));
    const descriptionGallery = tmpDescriptionGallery.map((tmp) => ({
      ...tmp,
      url: this.filesService.copy(tmp.url, this.uploadDir),
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

  async removeMedia(toRemove: ProductMediaDto[]) {
    return await Promise.all([
      this.productMediaModel.deleteMany({
        _id: { $in: toRemove.map((media) => media._id) },
      }),
      this.filesService.deleteMultiple(toRemove.map((media) => media.url)),
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
