import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseData from 'src/helpers/response-data';
import { EProductStatus } from '../enums/product-status.enum';
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
    const products = await this.productsService.getProductListByStatus(status);
    const response = new ResponseData(
      true,
      {
        message: 'Lấy danh sách sản phẩm thành công',
        products: products,
      },
      null,
    );

    return response;
  }

  @Get('list-all')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiOperation({
    summary: 'Lấy tất cả sản phẩm',
    description: 'Lấy tất cả sản phẩm',
    operationId: 'findAll',
  })
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  async findAll() {
    const [products, count] = await Promise.all([
      this.productsService
        .findAll()
        .select(
          '_id name thumbnail weight price status quantitySold quantityInStock',
        )
        .sort('-createdAt')
        .populate(['status', 'thumbnail'])
        .lean(),
      this.productsService.count(),
    ]);
    return new ResponseData(
      true,
      {
        // products: products.map((product) => ({
        //   ...product,
        //   status: this.productStatusService.translate(product.status.name),
        // })),
        totalDocs: count,
        products,
      },
      null,
    );
  }

  @Get('best-selling')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm bán chạy',
    description: 'Lấy danh sách sản phẩm bán chạy',
    operationId: 'getListBestSellingProducts',
  })
  async getListBestSellingProducts() {
    const [products] = await this.productsService.getListBestSellingProducts();
    const response = new ResponseData(
      true,
      {
        products,
      },
      null,
    );

    return response;
  }

  @Get('')
  searchProductByName() {}
}
