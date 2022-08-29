import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductCategorySchema } from './schemas/product-category.schema';
import { ProductMediaSchema } from './schemas/product-media.schema';
import { ProductMediaService } from './services/product-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'product',
        schema: ProductSchema,
      },
      {
        name: 'product-category',
        schema: ProductCategorySchema,
      },
      {
        name: 'product-media',
        schema: ProductMediaSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductMediaService],
})
export class ProductsModule {}
