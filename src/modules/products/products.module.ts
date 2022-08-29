import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/admin.products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductCategorySchema } from './schemas/product-category.schema';
import { ProductMediaSchema } from './schemas/product-media.schema';
import { ProductMediaService } from './services/product-media.service';
import { FilesModule } from '../files/files.module';
import { ProductModel } from './enums/product-model.enum';
import { ProductCategoriesService } from './services/product-categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductModel.PRODUCT,
        schema: ProductSchema,
      },
      {
        name: ProductModel.PRODUCT_CATEGORY,
        schema: ProductCategorySchema,
      },
      {
        name: ProductModel.PRODUCT_MEDIA,
        schema: ProductMediaSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductMediaService, ProductCategoriesService],
})
export class ProductsModule {}
