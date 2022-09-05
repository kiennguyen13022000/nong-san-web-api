import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/modules/files/files.service';
import { ProductModel } from '../enums/product-model.enum';
import { ProductMediaDocument } from '../schemas/product-media.schema';

@Injectable()
export class ProductMediaService {
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

  async updateSingle(newFile: any) {
    if (newFile.url.includes('tmp')) {
      const newUrl = this.filesService.copy(newFile.url, 'uploads');
      if (!newUrl) {
        return;
      }

      const result = await this.productMediaModel.create({
        ...newFile,
        url: newUrl,
      });

      return result._id;
    }
  }

  async updateMultiple(newFiles: any[]) {
    return newFiles.map((tmp) => {
      return this.updateSingle(tmp);
    });
  }

  async removeMedia(ids: string[]) {
    return this.productMediaModel.deleteMany({ _id: { $in: ids } });
  }

  async addIfNotExist(
    thumbnail: any,
    productGallery: any[],
    descriptionGallery: any[],
  ) {
    return await Promise.all([
      this.addToDatabase(thumbnail),
      await Promise.all(
        productGallery.map(async (media) => await this.addToDatabase(media)),
      ),
      await Promise.all(
        descriptionGallery.map(
          async (media) => await this.addToDatabase(media),
        ),
      ),
    ]);
  }

  private isNewMedia(file: any) {
    return file.url.includes('tmp');
  }

  private async addToDatabase(file: any) {
    const uploadDir = 'uploads';
    if (this.isNewMedia(file)) {
      const newUrl = this.filesService.copy(file.url, uploadDir);
      if (!newUrl) {
        throw new HttpException(
          { message: 'Tạo file mới thất bại!' },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return (
        await this.productMediaModel.create({
          ...file,
          url: newUrl,
        })
      )._id;
    }

    return file._id;
  }
}
