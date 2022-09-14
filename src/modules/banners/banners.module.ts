import { Module } from '@nestjs/common';
import { BannersService } from './services/banners.service';
import { AdminBannersController } from './controllers/admin-banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EBannerModel } from './enums/banner-model.enum';
import { BannerSchema } from './schemas/banner.schema';
import { BannerImageSchema } from './schemas/banner-image.schema';
import { FilesModule } from '../files/files.module';
import { BannerImagesService } from './services/banner-images.service';
import { CustomerBannersController } from './controllers/customer-banners.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EBannerModel.BANNER,
        schema: BannerSchema,
      },
      {
        name: EBannerModel.BANNER_IMAGE,
        schema: BannerImageSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [AdminBannersController, CustomerBannersController],
  providers: [BannersService, BannerImagesService],
})
export class BannersModule {}
