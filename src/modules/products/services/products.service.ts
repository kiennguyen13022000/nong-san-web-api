import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
// import { FilesService } from 'src/modules/files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    
  }

  async findAll() {
    return this.productModel.find({}).populate('category');
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
