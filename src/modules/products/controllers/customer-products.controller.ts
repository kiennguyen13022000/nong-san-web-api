import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import ResponseData from 'src/helpers/response-data';
import { EProductsSearchCriteria } from '../enums/product-search-criteria.enum';
import { ProductDocument } from '../schemas/product.schema';
import { ProductStatusService } from '../services/product-status.service';
import { ProductsService } from '../services/products.service';

@ApiTags('[Customer][Product] API liên quan đến sản phẩm')
@Controller('customer/products')
export class CustomerProductsController {
  constructor(
    private productsService: ProductsService,
    private productStatusService: ProductStatusService,
  ) {}

  @Get('status')
  @ApiOperation({
    summary: 'Lấy danh sách trạng thái sản phẩm',
    operationId: 'findStatus',
  })
  @ApiOkResponse({
    description: 'Lấy danh sách trạng thái sản phẩm thành công',
  })
  @ApiBadRequestResponse({
    description: 'Lấy danh sách trạng thái sản phẩm thất bại',
  })
  async findStatus() {
    const status = await this.productStatusService.findAll();
    return new ResponseData(true, status, null);
  }

  @Get('best-selling')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm bán chạy',
    description: 'Lấy danh sách sản phẩm bán chạy',
    operationId: 'getListBestSellingProducts',
  })
  async getListBestSellingProducts() {
    const products = await this.productsService.getListBestSellingProducts();
    const count = products.length;
    return new ResponseData(
      true,
      {
        totalDocs: count,
        products,
      },
      null,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm theo tiêu chí k',
    description:
      'Nếu không truyền giá trị của k thì lấy danh sách toàn bộ sản phẩm',
    operationId: 'findBy',
  })
  @ApiQuery({
    name: 'v',
    description: 'Giá trị lọc',
    required: false,
  })
  @ApiQuery({
    name: 'k',
    description: 'Tiêu chí lọc',
    required: false,
    enum: EProductsSearchCriteria,
  })
  @ApiOkResponse({
    description: 'Lấy danh sách sản phẩm thành công',
  })
  @ApiBadRequestResponse({
    description: 'Lấy danh sách sản phẩm thất bại',
  })
  async findBy(@Query() queries: any) {
    const { k, v } = queries;
    let products;
    switch (k) {
      case EProductsSearchCriteria.NAME:
        products = await this.productsService.searchProductByName(v);
        break;
      case EProductsSearchCriteria.STATUS:
        products = await this.productsService.getProductListByStatus(v);
        break;
      case undefined:
        products = await this.productsService.findAll();
        break;
      default:
        break;
    }

    const count = products.length;
    return new ResponseData(
      true,
      {
        totalDocs: count,
        products,
      },
      null,
    );
  }
}
