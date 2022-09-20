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
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Response } from 'express';
import ResponseData from 'src/helpers/ResponseData';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  MediaInterceptor,
  ThumbnailInterceptor,
} from 'src/modules/files/files.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadThumbnailDto } from '../dto/upload-thumbnail.dto';
import { UploadMediaDto } from '../dto/upload-media.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
        message: 'Upload file thành công!',
        url: file.path.replace('public', ''),
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Post('media')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadMediaDto })
  @UseInterceptors(MediaInterceptor)
  async uploadMedia(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const response = new ResponseData(
      true,
      {
        message: 'Upload file thành công!',
        files: files.map((file) => ({
          url: file.path.replace('public', ''),
        })),
      },
      null,
    );

    res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    const response = new ResponseData(true, products, null);
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
