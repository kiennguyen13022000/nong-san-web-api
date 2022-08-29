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
import { UploadThumbnailDto } from '../dto/upload-thumbnail.dto';
import { UploadGalleryDto } from '../dto/upload-gallery.dto';
import {
  GalleryInterceptor,
  ThumbnailInterceptor,
} from '../interceptors/media.interceptor';
import { UploadDescriptionGalleryDto } from '../dto/upload-description-gallery.dto';
import { ProductCategoriesService } from '../services/product-categories.service';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';

@ApiTags('[Admin] Sản phẩm')
@Controller('admin/products')
export class ProductsController {
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

  @Post('thumbnail')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadThumbnailDto })
  @UseInterceptors(ThumbnailInterceptor)
  async uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const response = new ResponseData(
      true,
      {
        message: 'Upload thumbnail thành công!',
        url: file.path.replace('public', ''),
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Post('gallery')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadGalleryDto })
  @UseInterceptors(GalleryInterceptor)
  async uploadGallery(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const response = new ResponseData(
      true,
      {
        message: 'Upload hình ảnh và video sản phẩm thành công!',
        files: files.map((file) => ({
          url: file.path.replace('public', ''),
        })),
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Post('description/gallery')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDescriptionGalleryDto })
  @UseInterceptors(GalleryInterceptor)
  async uploadDescriptionGallery(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const response = new ResponseData(
      true,
      {
        message: 'Upload hình ảnh và video mô tả sản phẩm thành công!',
        files: files.map((file) => ({
          url: file.path.replace('public', ''),
        })),
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
  // @ApiQuery({
  //   name: 'page',
  //   required: true,
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: true,
  // })
  // @ApiQuery({
  //   name: 'search',
  //   required: false,
  // })
  async findRelatedProducts(@Req() req: Request, @Res() res: Response) {
    // const { page, limit, search } = req.query;
    // const _page = Number(page);
    // const _limit = Number(limit);
    // const related = await this.productsService.findBy(
    //   _page,
    //   _limit,
    //   search?.toString(),
    // );
    const related = await this.productsService.findRelatedProducts();

    const response = new ResponseData(true, related, null);
    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
