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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Request, Response } from 'express';
import ResponseData from 'src/helpers/ResponseData';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductCategoriesService } from '../services/product-categories.service';

@ApiTags('[Admin] Sản phẩm')
@Controller('admin/products')
export class AdminProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
  })
  async findAll(@Req() req, @Res() res: Response) {
    const { page, limit } = req.query;
    if (isNaN(page) || isNaN(limit)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Yêu cầu không hợp lệ!' });
    }
    const _page = Number(page);
    const _limit = Number(limit);
    const [products, count] = await this.productsService.findByPage(
      _page,
      _limit,
    );
    const response = new ResponseData(
      true,
      {
        products,
        pageCount: Math.ceil(count / _limit),
        page: _page,
        limit: _limit,
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get('categories')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findCategories(@Res() res: Response) {
    const categories = await this.productCategoriesService.findAll();
    const response = new ResponseData(true, categories, null);
    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get('related')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'except',
    required: false,
    isArray: true,
  })
  async findRelatedProducts(@Req() req, @Res() res: Response) {
    const { except } = req.query;
    if (except && Array.isArray(except)) {
      const related = await this.productsService.findAllExceptById(except);
      const response = new ResponseData(true, related, null);
      res.status(HttpStatus.ACCEPTED).json(response);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(id);
    const response = new ResponseData(true, product, null);

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.findAndUpdate(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
