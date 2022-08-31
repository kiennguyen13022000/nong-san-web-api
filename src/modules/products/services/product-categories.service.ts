import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { ProductModel } from '../enums/product-model.enum';
import { ProductCategoryDocument } from '../schemas/product-category.schema';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel(ProductModel.PRODUCT_CATEGORY)
    private productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async create(categoryName: CreateProductCategoryDto) {
    return this.productCategoryModel.create({ name: categoryName });
  }

  async findAll() {
    return this.productCategoryModel.find({});
  }
}
