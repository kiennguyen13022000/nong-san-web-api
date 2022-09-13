import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import ResponseData from 'src/helpers/response-data';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductCategoriesService } from '../services/product-categories.service';
import { ProductStatusService } from '../services/product-status.service';

@ApiTags('[Admin] Sản phẩm')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('admin/products')
export class AdminProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly productStatusService: ProductStatusService,
  ) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({
    summary: 'Tạo sản phẩm mới',
    operationId: 'create',
  })
  @ApiOkResponse({ description: 'Tạo sản phẩm mới thành công' })
  @ApiBadRequestResponse({ description: 'Tạo sản phẩm mới thất bại' })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return new ResponseData(
      true,
      {
        message: 'Tạo sản phẩm mới thành công!',
        data: product,
      },
      null,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm',
    operationId: 'findAll',
  })
  @ApiOkResponse({ description: 'Lấy danh sách sản phẩm thành công' })
  @ApiBadRequestResponse({ description: 'Lấy danh sách sản phẩm thất bại' })
  async findAll() {
    const [products, count] = await Promise.all([
      this.productsService.findAll(),
      this.productsService.count(),
    ]);
    return new ResponseData(
      true,
      {
        products,
        totalDocs: count,
      },
      null,
    );
  }

  @Get('categories')
  @ApiOperation({
    summary: 'Lấy danh sách loại sản phẩm',
    operationId: 'findCategories',
  })
  @ApiOkResponse({ description: 'Lấy danh sách loại sản phẩm thành công' })
  @ApiBadRequestResponse({
    description: 'Lấy danh sách loại sản phẩm thất bại',
  })
  async findCategories() {
    const categories = await this.productCategoriesService.findAll();
    return new ResponseData(true, categories, null);
  }

  @Get('related')
  @ApiOperation({
    summary: 'Lấy danh sách sản phẩm liên quan',
    operationId: 'findRelatedProducts',
  })
  @ApiOkResponse({ description: 'Lấy danh sách sản phẩm liên quan thành công' })
  @ApiBadRequestResponse({
    description: 'Lấy danh sách sản phẩm liên quan thất bại',
  })
  async findRelatedProducts() {
    const related = await this.productsService.findAll();
    return new ResponseData(true, related, null);
  }

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

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin chi tiết sản phẩm',
    operationId: 'findOne',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Lấy danh sách trạng thái sản phẩm thành công',
  })
  @ApiBadRequestResponse({
    description: 'Lấy danh sách trạng thái sản phẩm thất bại',
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return new ResponseData(true, product, null);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật thông tin sản phẩm',
    operationId: 'update',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Cập nhật sản phẩm thành công',
  })
  @ApiBadRequestResponse({
    description: 'Cập nhật sản phẩm thất bại',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.findAndUpdate(id, updateProductDto);
    const product = await this.productsService.findOne(id);
    return new ResponseData(true, product, null);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa sản phẩm',
    operationId: 'remove',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Xóa sản phẩm thành công',
  })
  @ApiBadRequestResponse({
    description: 'Xóa sản phẩm thất bại',
  })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return new ResponseData(
      true,
      {
        message: 'Xóa sản phẩm thành công!',
      },
      null,
    );
  }
}
