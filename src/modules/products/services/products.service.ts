import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductMediaService } from './product-media.service';
import { ProductModel } from '../enums/product-model.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel.PRODUCT)
    private productModel: Model<ProductDocument>,
    private productMediaService: ProductMediaService,
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
    return this.productModel
      .find({})
      .select('_id name quantityInStock status')
      .sort('createdAt');
  }

  async count() {
    return this.productModel.estimatedDocumentCount();
  }

  async findAllExceptById(except: any[]) {
    return this.productModel
      .find({ _id: { $nin: except } })
      .select('_id name category thumbnail')
      .populate('category')
      .lean();
  }

  async findOne(id: string) {
    return this.productModel
      .findById(id)
      .populate(['thumbnail', 'category', 'gallery', 'description.gallery']);
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
}
