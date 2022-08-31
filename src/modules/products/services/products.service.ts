import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
      price: original,
      description: { gallery: tmpDescriptionGallery },
    } = createProductDto;

    const { thumbnail, productGallery, descriptionGallery } =
      await this.productMediaService.create(
        tmpThumbnail,
        tmpProductGallery,
        tmpDescriptionGallery,
      );

    const newProduct = {
      ...createProductDto,
      thumbnail,
      gallery: productGallery,
      price: {
        original,
      },
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
      .populate(['thumbnail', 'category', 'gallery', 'description.gallery']);
  }

  async findByPage(page: number, limit: number) {
    const products = this.productModel
      .find({})
      .sort('createdAt')
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(['thumbnail', 'category', 'gallery', 'description.gallery']);
    const count = this.productModel.estimatedDocumentCount();
    return Promise.all([products, count]);
  }

  async findAllExceptById(except: any[]) {
    return this.productModel
      .find({ _id: { $nin: except } })
      .select('_id name category thumbnail')
      .populate('category');
  }

  async findOne(id: string) {
    return this.productModel
      .findById(id)
      .populate(['thumbnail', 'category', 'gallery', 'description.gallery']);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
