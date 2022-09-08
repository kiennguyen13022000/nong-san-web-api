import { Module } from '@nestjs/common';
import { BannersService } from './services/banners.service';
import { AdminBannersController } from './controllers/admin-banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerModel } from './enums/banner-model.enum';
import { BannerSchema } from './schemas/banner.schema';
import { BannerImageSchema } from './schemas/banner-image.schema';
import { FilesModule } from '../files/files.module';
import { BannerImagesService } from './services/banner-images.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BannerModel.BANNER,
        schema: BannerSchema,
      },
      {
        name: BannerModel.BANNER_IMAGE,
        schema: BannerImageSchema,
      },
    ]),
    FilesModule,
  ],
  controllers: [AdminBannersController],
  providers: [BannersService, BannerImagesService],
})
export class BannersModule {}
