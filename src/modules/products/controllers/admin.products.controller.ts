import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Response } from 'express';
import ResponseData from 'src/helpers/ResponseData';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductCategoriesService } from '../services/product-categories.service';

@ApiTags('[Admin] Sản phẩm')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('admin/products')
export class AdminProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.create(createProductDto);
    const response = new ResponseData(
      true,
      {
        message: 'Tạo sản phẩm mới thành công!',
        data: product,
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const [products, count] = await this.productsService.findAll();
    const response = new ResponseData(
      true,
      {
        products,
        totalDocs: count,
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get('categories')
  async findCategories(@Res() res: Response) {
    const categories = await this.productCategoriesService.findAll();
    const response = new ResponseData(true, categories, null);
    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get('related')
  @ApiQuery({
    name: 'except',
    required: false,
    isArray: true,
  })
  async findRelatedProducts(
    @Query('except') except: string[],
    @Res() res: Response,
  ) {
    const related = await this.productsService.findAllExceptById(except);
    const response = new ResponseData(true, related, null);
    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(id);
    const response = new ResponseData(true, product, null);

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.findAndUpdate(id, updateProductDto);
    const product = await this.productsService.findOne(id);
    const response = new ResponseData(true, product, null);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.productsService.remove(id);
    const response = new ResponseData(
      true,
      {
        message: 'Xóa sản phẩm thành công!',
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }
}
