import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { AdminProductsController } from './controllers/admin-products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductCategorySchema } from './schemas/product-category.schema';
import { ProductMediaSchema } from './schemas/product-media.schema';
import { ProductMediaService } from './services/product-media.service';
import { FilesModule } from '../files/files.module';
import { EProductModel } from './enums/product-model.enum';
import { ProductCategoriesService } from './services/product-categories.service';
import { CustomerProductsController } from './controllers/customer-products.controller';
import { ProductStatusSchema } from './schemas/product-status.schema';
import { ProductStatusService } from './services/product-status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EProductModel.PRODUCT,
        schema: ProductSchema,
      },
      {
        name: EProductModel.PRODUCT_CATEGORY,
        schema: ProductCategorySchema,
      },
      {
        name: EProductModel.PRODUCT_MEDIA,
        schema: ProductMediaSchema,
      },
      {
        name: EProductModel.PRODUCT_STATUS,
        schema: ProductStatusSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [AdminProductsController, CustomerProductsController],
  providers: [
    ProductsService,
    ProductMediaService,
    ProductCategoriesService,
    ProductStatusService,
  ],
})
export class ProductsModule {}
