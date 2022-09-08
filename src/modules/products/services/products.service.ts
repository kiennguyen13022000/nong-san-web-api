import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductMediaService } from './product-media.service';
import { EProductModel } from '../enums/product-model.enum';
import { existsSync } from 'fs';
import { join } from 'path';
import { ProductStatusService } from './product-status.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(EProductModel.PRODUCT)
    private productModel: Model<ProductDocument>,
    private productMediaService: ProductMediaService,
    private productStatusService: ProductStatusService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const {
      thumbnail: tmpThumbnail,
      gallery: tmpProductGallery,
      description: { gallery: tmpDescriptionGallery },
    } = createProductDto;

    const [thumbnail, productGallery, descriptionGallery] =
      await this.productMediaService.createIfNotExist(
        tmpThumbnail,
        tmpProductGallery,
        tmpDescriptionGallery,
      );

    const newProduct = {
      ...createProductDto,
      thumbnail,
      gallery: productGallery,
      description: {
        ...createProductDto.description,
        gallery: descriptionGallery,
      },
    };

    return this.productModel.create(newProduct);
  }

  async findAll() {
    const products = await this.productModel
      .find({})
      .select('_id name quantityInStock status')
      .sort('createdAt')
      .populate(['status'])
      .lean();

    return products.map((product) => ({
      ...product,
      status: {
        ...product.status,
        name: this.productStatusService.translate(product.status.name),
      },
    }));
  }

  async count() {
    return this.productModel.estimatedDocumentCount();
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate([
        'thumbnail',
        'category',
        'gallery',
        'description.gallery',
        'status',
      ])
      .lean();

    if (!existsSync(join('public', product.thumbnail?.url))) {
      product.thumbnail.url = 'No_Image_Available.jpg';
    }
    for (const media of product.gallery) {
      if (!existsSync(join('public', media?.url))) {
        media.url = 'No_Image_Available.jpg';
      }
    }
    for (const media of product.description.gallery) {
      if (!existsSync(join('public', media?.url))) {
        media.url = 'No_Image_Available.jpg';
      }
    }

    return {
      ...product,
      status: {
        ...product.status,
        name: this.productStatusService.translate(product.status.name),
      },
    };
  }

  async findAndUpdate(id: string, updateProductDto: UpdateProductDto) {
    const {
      thumbnail: updatedThumbnail,
      gallery: updatedProductGallery,
      description: { gallery: updatedDescriptionGallery },
      removeMedia,
      ...rest
    } = updateProductDto;

    const [thumbnail, productGallery, descriptionGallery] =
      await this.productMediaService.createIfNotExist(
        updatedThumbnail,
        updatedProductGallery,
        updatedDescriptionGallery,
      );

    if (removeMedia && removeMedia.length > 0) {
      await this.productMediaService.removeMedia(removeMedia);
    }

    const updatedProduct = {
      ...rest,
      thumbnail,
      gallery: productGallery,
      description: {
        ...updateProductDto.description,
        gallery: descriptionGallery,
      },
    };

    return this.productModel.findByIdAndUpdate(id, updatedProduct);
  }

  async remove(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }

  async getProductListByStatus(status: string) {
    const products = await this.productModel
      .find({ status })
      .sort('createdAt')
      .select(
        '_id name thumbnail weight price status quantitySold quantityInStock',
      )
      .populate(['thumbnail', 'status']);

    return products.map((product) => ({
      ...product,
      status: {
        ...product.status,
        name: this.productStatusService.translate(product.status.name),
      },
    }));
  }
}
