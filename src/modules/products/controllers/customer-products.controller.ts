import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseData from 'src/helpers/response-data';
import { EProductStatus } from '../enums/product-status.enum';
import { ProductsService } from '../services/products.service';

@ApiTags('[Frontend][Customer][Product] Api liên quan đến sản phẩm')
@Controller('customer/products')
export class CustomerProductsController {
  constructor(private productService: ProductsService) {}

  @Get('status')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm theo trạng thái',
    description: 'Lấy tất cả các sản phẩm theo từng trạng thái',
    operationId: 'getProductListByStatus',
  })
  @ApiQuery({
    name: 'status',
    enum: EProductStatus,
  })
  async getProductListByStatus(@Query('status') status: string) {
    const products = await this.productService.getProductListByStatus(status);
    const response = new ResponseData(
      true,
      {
        message: 'Lấy danh sách sản phẩm thành công',
        products: products,
      },
      null,
    );

    @Get('list-all')
    @ApiResponse({status: 200, description:'Lấy dữ liệu thành công'})
    @ApiOperation({
        summary: 'Lấy tất cả sản phẩm',
        description: 'Lấy tất cả sản phẩm',
        operationId: 'findAll'
    })
    @ApiResponse({status: 200, description:'Lấy dữ liệu thành công'})
    async findAll() {
        const [products] = await this.productService.findAll();
        const response = new ResponseData(
          true,
          {
            products
          },
          null,
        );

        return response;
    }

    @Get('best-selling')
    @ApiResponse({status: 200, description:'Lấy dữ liệu thành công'})
    @ApiOperation({
        summary: 'Lấy danh sách sản phẩm bán chạy',
        description: 'Lấy danh sách sản phẩm bán chạy',
        operationId: 'getListBestSellingProducts'
    })
    async getListBestSellingProducts() {
        const [products] = await this.productService.getListBestSellingProducts();
        const response = new ResponseData(
          true,
          {
            products
          },
          null,
        );

        return response;
    }
}
