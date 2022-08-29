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
    return this.productModel.find({}).populate('category');
  }

  async findBy(page: number, limit: number, search?: string) {
    const searchCondition = search
      ? { name: new RegExp(`${search}`, 'i') }
      : {};
    return (
      this.productModel
        .find({})
        // .skip((page - 1) * limit)
        // .limit(limit)
        .sort('category')
    );
  }

  async findRelatedProducts() {
    return this.productModel
      .find({})
      .select('_id name category')
      .populate('category');
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
