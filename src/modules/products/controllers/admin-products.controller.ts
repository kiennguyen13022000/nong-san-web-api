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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
  async findCategories() {
    const categories = await this.productCategoriesService.findAll();
    return new ResponseData(true, categories, null);
  }

  @Get('related')
  async findRelatedProducts() {
    const related = await this.productsService.findAll();
    return new ResponseData(true, related, null);
  }

  @Get('status')
  async findStatus() {
    const status = await this.productStatusService.findAll();
    return new ResponseData(true, status, null);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return new ResponseData(true, product, null);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.findAndUpdate(id, updateProductDto);
    const product = await this.productsService.findOne(id);
    return new ResponseData(true, product, null);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.productsService.remove(id);
      return new ResponseData(
        true,
        {
          message: 'Xóa sản phẩm thành công!',
        },
        null,
      );
    } catch (error) {
      console.log(error);
    }
  }
}